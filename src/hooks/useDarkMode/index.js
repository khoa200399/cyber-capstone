import { useEffect } from "react";
import useLocalStorage from "hooks/useLocalStorage";
import useMedia from "hooks/useMedia";

const useDarkMode = () => {
  const [enabledState, setEnabledState] = useLocalStorage("dark-mode-enabled");
  const prefersDarkMode = usePrefersDarkMode();
  const enabled =
    typeof enabledState !== "undefined" ? enabledState : prefersDarkMode;
  useEffect(() => {
    const className = "dark";
    const element = window.document.documentElement;
    if (enabled) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }, [enabled]);
  return [enabled, setEnabledState];
}

const usePrefersDarkMode = () => {
  return useMedia(["(prefers-color-scheme: dark)"], [true], false);
};

export default useDarkMode;
