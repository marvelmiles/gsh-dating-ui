"use client";

import { useEffect, useState } from "react";

const useScreen = (config = {}) => {
  const { screen = 1024, onScreenChange } = config;

  const [isScreen, setIsScreen] = useState({
    isScreen: false,
    isTouchDevice: false,
  });

  useEffect(() => {
    if (screen) {
      const onResize = () => {
        if (window.innerWidth >= screen) {
          setIsScreen((prev) => ({ ...prev, isScreen: true }));
          onScreenChange && onScreenChange(true);
        } else {
          setIsScreen((prev) => ({ ...prev, isScreen: false }));
          onScreenChange && onScreenChange(false);
        }
      };

      onResize();

      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    }

    setIsScreen((prev) => ({
      ...prev,
      isTouchDevice: (() => {
        if (typeof window === "undefined") return false;

        // Check for touch event listeners
        const hasTouchEvents = "ontouchstart" in window;

        // Check for pointer events and if the device supports touch
        const hasPointerEvents =
          window.PointerEvent &&
          (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);

        // Modern CSS check for touch support
        const hasTouchCSS = window.matchMedia("(any-pointer: coarse)").matches;

        return hasTouchEvents || hasPointerEvents || hasTouchCSS;
      })(),
    }));
  }, [screen, onScreenChange]);

  return isScreen;
};

export default useScreen;
