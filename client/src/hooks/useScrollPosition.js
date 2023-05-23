import { useState, useEffect } from "react";

function useScrollPosition(threshold) {
  const [isPastThreshold, setIsPastThreshold] = useState(
    window.scrollY >= threshold
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsPastThreshold(window.scrollY >= threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isPastThreshold;
}

export default useScrollPosition;
