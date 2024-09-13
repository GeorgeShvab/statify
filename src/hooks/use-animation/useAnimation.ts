import { useEffect, useLayoutEffect, useRef, useState } from "react";

// This hook is for opening and closing animation
const useAnimation = (isActive: boolean, ms: number = 300) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const closeTimer = useRef<NodeJS.Timeout>();

  useLayoutEffect(() => {
    clearTimeout(closeTimer.current);

    if (isActive) {
      setIsMounted(true);

      // In case while closing opening occurs, than we immediatly set visible
      if (isMounted && !isVisible) {
        setIsVisible(true);
      }
    } else {
      setIsVisible(false);

      closeTimer.current = setTimeout(() => {
        setIsMounted(false);
      }, ms);
    }
  }, [isActive]);

  useEffect(() => {
    if (isMounted) {
      setIsVisible(true);
    }
  }, [isMounted]);

  return { isMounted, isVisible };
};

export default useAnimation;
