import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ReactGA from "react-ga4";
import "./index.css";
import App from "./App.jsx";

ReactGA.initialize("yG-BY5PHZWJXB");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter
      basename={import.meta.env.BASE_URL}
      future={{ v7_relativeSplatPath: true }}
    >
      <App />
    </BrowserRouter>
  </StrictMode>,
)
