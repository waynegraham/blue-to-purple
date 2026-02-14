import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TestModeScreen from "./pages/TestModeScreen";
import TestPreparationGuide from "./pages/TestPreparationGuide";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/test-mode" element={<TestModeScreen />} />
      <Route
        path="/test-preparation-guide"
        element={<TestPreparationGuide />}
      />
    </Routes>
  );
}

export default App;
