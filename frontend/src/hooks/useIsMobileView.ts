import { useEffect, useState } from "react";

export const useIsMobileView = (breakpoint = 1030) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= breakpoint);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isMobileView
}
