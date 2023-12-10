"use client";

import { useCallback, useState } from "react";

export const useFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const enterFullScreen = useCallback(async () => {
    await document.body.requestFullscreen();
    setIsFullScreen(true);
  }, []);
  const exitFullScreen = useCallback(async () => {
    await document.exitFullscreen();
    setIsFullScreen(false);
  }, []);

  const toggleFullScreen = useCallback(() => {
    if (isFullScreen) {
      return exitFullScreen();
    }
    return enterFullScreen();
  }, [isFullScreen, exitFullScreen, enterFullScreen]);

  return {
    isFullScreen,
    toggleFullScreen,
    enterFullScreen,
    exitFullScreen,
  } as const;
};
