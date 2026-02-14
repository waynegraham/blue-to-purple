import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTestMode from "../components/test-mode/ReusableTestMode";
import movesData from "../data/moves.json";

function TestModeScreen() {
  const navigate = useNavigate();

  const handleExit = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <ReusableTestMode
      moveSections={movesData}
      onExit={handleExit}
      title="Test Mode"
      jumpButtonLabel="Jump to Purple"
      completionHeading="Congratulations, you're now a purple belt."
      completionSubheading="Swipe down or left to review the last move, up or right to restart the sequence."
      defaultMoveDescription="Perform the move with control and intent."
      getJumpIndex={(moves) => moves.findIndex((move) => move.bold === true)}
    />
  );
}

export default TestModeScreen;
