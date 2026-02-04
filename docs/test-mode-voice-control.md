# Test Mode Voice Control Specification

## Scope
- Voice control is active only in Test Mode.
- Target platforms: iPhone/iPad Safari, Android Chrome.
- Requires explicit user gesture (mic button) to start recognition.

## Goals
- Enable hands-free navigation during Test Mode.
- Support natural phrase variants for core actions.
- Provide clear, lightweight UI feedback for status and errors.

## Non-Goals
- Voice control outside Test Mode.
- Dictation or free-form commands.
- Desktop browser support requirements (best-effort only).

## UX
### Entry Points
- Test Mode UI includes a `Start Voice` / mic button.
- When active, the control toggles to `Stop Voice`.

### Feedback (Banner/Toast)
- Listening started
- Listening stopped
- Permission denied (with brief guidance)
- Recognition error (with “Retrying…” when auto-restart is attempted)
- Voice control unsupported on this browser

## Recognition Behavior
- Continuous recognition runs while in Test Mode after user starts it.
- Commands are always active (no focus gating).
- Auto-restart on end/error unless user stopped it or permission denied.
- On permission denied, recognition stops and user is prompted to enable mic access.

## Command Phrases
Matching is case-insensitive and tolerant of extra words.

### Advance
- “next move”
- “next”
- “go next”
- “forward”

### Previous
- “last move”
- “previous”
- “go back”
- “back”

### Exit Test Mode
- “tap out”
- “exit”
- “quit”
- “stop”
- “leave test mode”

## Actions Mapping
- Advance → triggers the same behavior as the existing “Next move” control.
- Previous → triggers the same behavior as the existing “Last move” control.
- Exit → triggers the same behavior as “Exit Fullscreen”.

## Error Handling
- If SpeechRecognition is unavailable, show banner: “Voice control not supported on this browser.”
- If recognition errors or timeouts occur, show banner and attempt auto-restart after a short delay.
- If permission is denied, show banner with guidance and disable voice control until user retries.

## Open Items (Implementation Decisions)
- Phrase matching strategy: exact keywords vs. fuzzy match.
- Auto-restart delay length.
- Exact banner copy and duration.
