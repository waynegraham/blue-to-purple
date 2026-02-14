import { IoMicOutline, IoMicOffOutline } from "react-icons/io5";
import { GiBlackBelt } from "react-icons/gi";
import { useTestModeController } from "./useTestModeController";
import { buildYoutubeUrl } from "./testModeUtils";

const defaultVoiceCommands = {
  next: [/next move/, /\bnext\b/, /\bgo next\b/, /\bforward\b/],
  previous: [/last move/, /\bprevious\b/, /\bgo back\b/, /\bback\b/],
  exit: [/tap out/, /\bexit\b/, /\bquit\b/, /\bstop\b/, /leave test mode/],
};

function VoiceButtonContent({ isListening }) {
  if (isListening) {
    return (
      <span className="flex items-center gap-2">
        <IoMicOffOutline className="text-base" />
        <span>Stop Voice</span>
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2">
      <IoMicOutline className="text-base" />
      <span>Start Voice</span>
    </span>
  );
}

function Banner({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div className="absolute left-1/2 top-4 z-20 w-[92%] max-w-xl -translate-x-1/2 rounded-full border border-white/20 bg-slate-900/90 px-6 py-3 text-center text-sm text-white shadow-lg backdrop-blur">
      {message}
    </div>
  );
}

export default function ReusableTestMode({
  moveSections,
  onExit,
  title = "Test Mode",
  jumpButtonLabel = "Jump to Purple",
  completionHeading = "Congratulations, you're now a purple belt.",
  completionSubheading = "Swipe down or left to review the last move, up or right to restart the sequence.",
  defaultMoveDescription = "Perform the move with control and intent.",
  getJumpIndex = (moves) => moves.findIndex((move) => move.bold === true),
  voiceCommands = defaultVoiceCommands,
}) {
  const {
    banner,
    containerRef,
    currentIndex,
    currentMove,
    fullscreenFailed,
    goPrevious,
    handleExit,
    isComplete,
    isListening,
    isSupported,
    jumpIndex,
    jumpToTarget,
    permissionDenied,
    setCurrentIndex,
    startVoice,
    stopVoice,
    swipeHandlers,
    totalMoves,
    voiceSupported,
  } = useTestModeController({
    moveSections,
    getJumpIndex,
    onExit,
    voiceCommands,
  });

  const voiceButtonContent = <VoiceButtonContent isListening={isListening} />;
  const toggleVoice = isListening ? stopVoice : startVoice;
  const canJump = jumpIndex >= 0;

  if (totalMoves === 0) {
    return (
      <div
        ref={containerRef}
        className="fixed inset-0 flex flex-col items-center justify-center bg-slate-950 text-white"
      >
        <Banner message={banner} />
        <p className="text-2xl font-semibold">No moves available.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={toggleVoice}
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
        <Banner message={banner} />
        <button
          onClick={handleExit}
          className="absolute right-6 top-6 rounded-full border border-white/30 px-4 py-2 text-sm text-white transition hover:bg-white/10"
        >
          Exit Fullscreen
        </button>
        <div className="absolute left-6 top-6 flex items-center gap-3">
          {canJump ? (
            <button
              onClick={jumpToTarget}
              className="rounded-full border border-white/30 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              <span className="flex items-center gap-2">
                <GiBlackBelt className="text-base" />
                <span>{jumpButtonLabel}</span>
              </span>
            </button>
          ) : null}
          <button
            onClick={toggleVoice}
            className="rounded-full border border-white/30 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            {voiceButtonContent}
          </button>
        </div>
        <div className="max-w-3xl px-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-200">
            Completion
          </p>
          <h1 className="mt-6 text-4xl font-bold md:text-6xl">{completionHeading}</h1>
          <p className="mt-6 text-lg text-purple-100 md:text-2xl">{completionSubheading}</p>
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
  const description = currentMove?.note?.trim() || defaultMoveDescription;

  return (
    <div
      ref={containerRef}
      {...swipeHandlers}
      className="fixed inset-0 flex flex-col bg-slate-950 text-white"
    >
      <Banner message={banner} />
      <div className="flex items-center justify-between px-6 py-6">
        <div className="text-xs uppercase tracking-[0.35em] text-purple-200">{title}</div>
        <div className="flex items-center gap-3">
          {canJump ? (
            <button
              onClick={jumpToTarget}
              className="rounded-full border border-white/30 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              <span className="flex items-center gap-2">
                <GiBlackBelt className="text-base" />
                <span>{jumpButtonLabel}</span>
              </span>
            </button>
          ) : null}
          <button
            onClick={toggleVoice}
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
          <h1 className="mt-6 text-4xl font-bold md:text-6xl">{currentMove?.name}</h1>
          <p className="mt-6 text-lg text-slate-200 md:text-2xl">{description}</p>
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
              Swipe up or right for next, down or left for previous.
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
