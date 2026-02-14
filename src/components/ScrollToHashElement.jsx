import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToHashElement() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return undefined;
    }

    const elementId = decodeURIComponent(location.hash.slice(1));
    let timeoutId;
    let attempts = 0;

    const tryScroll = () => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      attempts += 1;
      if (attempts < 10) {
        timeoutId = window.setTimeout(tryScroll, 100);
      }
    };

    tryScroll();

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [location.hash, location.pathname]);

  return null;
}

export default ScrollToHashElement;
