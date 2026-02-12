import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { useWakeLock } from "react-screen-wake-lock";
import { IoMicOutline, IoMicOffOutline } from "react-icons/io5";
import { GiBlackBelt } from "react-icons/gi";
import movesData from "../data/moves.json";

const buildYoutubeUrl = (youtube) => {
  if (!youtube) {
    return "";
  }

  const [id, query] = youtube.split("?");
  if (query) {
    return `https://www.youtube.com/watch?v=${id}&${query}`;
  }
  return `https://www.youtube.com/watch?v=${id}`;
};

function TestModeScreen() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const recognitionRef = useRef(null);
  const restartTimeoutRef = useRef(null);
  const wantsListeningRef = useRef(false);
  const stoppingRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenFailed, setFullscreenFailed] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [banner, setBanner] = useState(null);

  const { isSupported, request: requestWakeLock, release: releaseWakeLock } =
    useWakeLock();

  const flattenedMoves = useMemo(
    () =>
      movesData.flatMap((section) =>
        section.moves.map((move) => ({
          ...move,
          sectionLabel: section.label,
        }))
      ),
    []
  );

  const totalMoves = flattenedMoves.length;
  const firstBoldMoveIndex = useMemo(
    () => flattenedMoves.findIndex((move) => move.bold === true),
    [flattenedMoves]
  );
  const isComplete = currentIndex >= totalMoves;
  const currentMove = flattenedMoves[currentIndex];

  const goNext = useCallback(() => {
    setCurrentIndex((index) => Math.min(index + 1, totalMoves));
  }, [totalMoves]);

  const goPrevious = useCallback(() => {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }, []);

  const jumpToPurple = useCallback(() => {
    if (firstBoldMoveIndex >= 0) {
      setCurrentIndex(firstBoldMoveIndex);
    }
  }, [firstBoldMoveIndex]);

  const showBanner = useCallback((message) => {
    setBanner(message);
  }, []);

  const clearBanner = useCallback(() => {
    setBanner(null);
  }, []);

  const handleExit = useCallback(async () => {
    if (recognitionRef.current) {
      wantsListeningRef.current = false;
      stoppingRef.current = true;
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore stop errors.
      }
      setIsListening(false);
    }
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch {
        // Ignore fullscreen exit errors.
      }
    }
    navigate("/");
  }, [navigate]);

  const voiceButtonContent = isListening ? (
    <span className="flex items-center gap-2">
      <IoMicOffOutline className="text-base" />
      <span>Stop Voice</span>
    </span>
  ) : (
    <span className="flex items-center gap-2">
      <IoMicOutline className="text-base" />
      <span>Start Voice</span>
    </span>
  );

  const swipeHandlers = useSwipeable({
    onSwipedDown: goNext,
    onSwipedUp: goPrevious,
    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 70,
  });

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    setVoiceSupported(Boolean(SpeechRecognition));
  }, []);

  useEffect(() => {
    let isActive = true;

    const requestFullscreen = async () => {
      const element = containerRef.current;
      if (!element || !element.requestFullscreen) {
        return;
      }
      try {
        await element.requestFullscreen();
      } catch {
        if (isActive) {
          setFullscreenFailed(true);
        }
      }
    };

    requestFullscreen();

    if (isSupported) {
      requestWakeLock().catch(() => {});
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      isActive = false;
      document.body.style.overflow = previousOverflow;
      releaseWakeLock().catch(() => {});
    };
  }, [isSupported, requestWakeLock, releaseWakeLock]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        goNext();
      }
      if (event.key === "ArrowUp" || event.key === "PageUp") {
        goPrevious();
      }
      if (event.key === "Escape") {
        handleExit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrevious, handleExit]);

  useEffect(() => {
    if (!banner) {
      return undefined;
    }
    const timeout = window.setTimeout(() => {
      setBanner(null);
    }, 3200);
    return () => window.clearTimeout(timeout);
  }, [banner]);

  useEffect(() => {
    return () => {
      if (restartTimeoutRef.current) {
        window.clearTimeout(restartTimeoutRef.current);
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // Ignore cleanup errors.
        }
      }
    };
  }, []);

  const getRecognition = useCallback(() => {
    if (recognitionRef.current) {
      return recognitionRef.current;
    }
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceSupported(false);
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      if (!result || !result[0]) {
        return;
      }
      const transcript = result[0].transcript.toLowerCase();
      const matchesAny = (patterns) =>
        patterns.some((pattern) => pattern.test(transcript));

      if (
        matchesAny([
          /next move/,
          /\bnext\b/,
          /\bgo next\b/,
          /\bforward\b/,
        ])
      ) {
        goNext();
        return;
      }

      if (
        matchesAny([
          /last move/,
          /\bprevious\b/,
          /\bgo back\b/,
          /\bback\b/,
        ])
      ) {
        goPrevious();
        return;
      }

      if (
        matchesAny([
          /tap out/,
          /\bexit\b/,
          /\bquit\b/,
          /\bstop\b/,
          /leave test mode/,
        ])
      ) {
        handleExit();
      }
    };

    recognition.onerror = (event) => {
      if (event?.error === "not-allowed" || event?.error === "service-not-allowed") {
        setPermissionDenied(true);
        wantsListeningRef.current = false;
        setIsListening(false);
        showBanner("Microphone permission denied. Enable access to use voice.");
        return;
      }
      showBanner("Voice recognition error. Retrying...");
    };

    recognition.onend = () => {
      if (stoppingRef.current) {
        stoppingRef.current = false;
        return;
      }
      if (!wantsListeningRef.current || permissionDenied) {
        setIsListening(false);
        return;
      }
      restartTimeoutRef.current = window.setTimeout(() => {
        try {
          recognition.start();
        } catch {
          // Ignore restart errors.
        }
      }, 600);
    };

    recognitionRef.current = recognition;
    return recognition;
  }, [goNext, goPrevious, handleExit, permissionDenied, showBanner]);

  const startVoice = useCallback(() => {
    const recognition = getRecognition();
    if (!recognition) {
      showBanner("Voice control not supported on this browser.");
      return;
    }
    setPermissionDenied(false);
    wantsListeningRef.current = true;
    stoppingRef.current = false;
    try {
      recognition.start();
      setIsListening(true);
      showBanner("Voice listening started.");
    } catch {
      showBanner("Voice recognition error. Retrying...");
    }
  }, [getRecognition, showBanner]);

  const stopVoice = useCallback(() => {
    if (!recognitionRef.current) {
      return;
    }
    wantsListeningRef.current = false;
    stoppingRef.current = true;
    try {
      recognitionRef.current.stop();
    } catch {
      // Ignore stop errors.
    }
    setIsListening(false);
    showBanner("Voice listening stopped.");
  }, [showBanner]);

  if (totalMoves === 0) {
    return (
      <div
        ref={containerRef}
        className="fixed inset-0 flex flex-col items-center justify-center bg-slate-950 text-white"
      >
        {banner ? (
          <div className="absolute left-1/2 top-4 z-20 w-[92%] max-w-xl -translate-x-1/2 rounded-full border border-white/20 bg-slate-900/90 px-6 py-3 text-center text-sm text-white shadow-lg backdrop-blur">
            {banner}
          </div>
        ) : null}
        <p className="text-2xl font-semibold">No moves available.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={isListening ? stopVoice : startVoice}
            className="rounded-full border border-white/30 px-5 py-2 text-white transition hover:bg-white/10"
          >
            {voiceButtonContent}
          </button>
          <button
            onClick={handleExit}
            className="rounded-full border border-white/30 px-5 py-2 text-white transition hover:bg-white/10"
          >
            Exit Fullscreen
          </button>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div
        ref={containerRef}
        {...swipeHandlers}
        className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white"
      >
        {banner ? (
          <div className="absolute left-1/2 top-4 z-20 w-[92%] max-w-xl -translate-x-1/2 rounded-full border border-white/20 bg-slate-900/90 px-6 py-3 text-center text-sm text-white shadow-lg backdrop-blur">
            {banner}
          </div>
        ) : null}
        <button
          onClick={handleExit}
          className="absolute right-6 top-6 rounded-full border border-white/30 px-4 py-2 text-sm text-white transition hover:bg-white/10"
        >
          Exit Fullscreen
        </button>
        <div className="absolute left-6 top-6 flex items-center gap-3">
          <button
            onClick={jumpToPurple}
            className="rounded-full border border-white/30 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            <span className="flex items-center gap-2">
              <GiBlackBelt className="text-base" />
              <span>Jump to Purple</span>
            </span>
          </button>
          <button
            onClick={isListening ? stopVoice : startVoice}
            className="rounded-full border border-white/30 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            {voiceButtonContent}
          </button>
        </div>
        <div className="max-w-3xl px-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-200">
            Completion
          </p>
          <h1 className="mt-6 text-4xl font-bold md:text-6xl">
            Congratulations, you&apos;re now a purple belt.
          </h1>
          <p className="mt-6 text-lg text-purple-100 md:text-2xl">
            Swipe up to review the last move or restart the sequence.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => setCurrentIndex(0)}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-purple-100"
            >
              Restart
            </button>
            <button
              onClick={goPrevious}
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Previous Move
            </button>
          </div>
        </div>
      </div>
    );
  }

  const videoUrl = buildYoutubeUrl(currentMove?.youtube);
  const description =
    currentMove?.note?.trim() || "Perform the move with control and intent.";

  return (
    <div
      ref={containerRef}
      {...swipeHandlers}
      className="fixed inset-0 flex flex-col bg-slate-950 text-white"
    >
      {banner ? (
        <div className="absolute left-1/2 top-4 z-20 w-[92%] max-w-xl -translate-x-1/2 rounded-full border border-white/20 bg-slate-900/90 px-6 py-3 text-center text-sm text-white shadow-lg backdrop-blur">
          {banner}
        </div>
      ) : null}
      <div className="flex items-center justify-between px-6 py-6">
        <div className="text-xs uppercase tracking-[0.35em] text-purple-200">
          Test Mode
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={jumpToPurple}
            className="rounded-full border border-white/30 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            <span className="flex items-center gap-2">
              <GiBlackBelt className="text-base" />
              <span>Jump to Purple</span>
            </span>
          </button>
          <button
            onClick={isListening ? stopVoice : startVoice}
            className="rounded-full border border-white/30 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            {voiceButtonContent}
          </button>
          <button
            onClick={handleExit}
            className="rounded-full border border-white/30 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            Exit Fullscreen
          </button>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-4xl">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-300">
            {currentMove?.sectionLabel}
          </p>
          <h1 className="mt-6 text-4xl font-bold md:text-6xl">
            {currentMove?.name}
          </h1>
          <p className="mt-6 text-lg text-slate-200 md:text-2xl">
            {description}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={videoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-purple-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-400"
            >
              Watch Video
            </a>
            <div className="text-sm text-slate-300">
              Swipe down for next, swipe up for previous.
            </div>
            <div className="text-sm text-slate-300">
              {voiceSupported
                ? "Tap Start Voice to enable voice commands."
                : "Voice control not supported on this browser."}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 px-6 py-4 text-sm text-slate-300">
        <span>
          Move {currentIndex + 1} of {totalMoves}
        </span>
        <span>
          {permissionDenied
            ? "Microphone access blocked."
            : fullscreenFailed
            ? "Fullscreen request blocked."
            : isSupported
            ? "Screen stays awake."
            : "Wake Lock not supported."}
        </span>
      </div>
    </div>
  );
}

export default TestModeScreen;
