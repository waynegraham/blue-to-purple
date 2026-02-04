import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TestModeScreen from "./pages/TestModeScreen";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/test-mode" element={<TestModeScreen />} />
    </Routes>
  );
}

export default App;
