import { useEffect, useState } from "react";

export function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);

    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop("matches" in e ? e.matches : mq.matches);
    };

    handler(mq); // initial value

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return isDesktop;
}
