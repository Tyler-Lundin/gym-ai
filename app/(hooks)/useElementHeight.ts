import { useState, useEffect, useRef } from "react";

function useElementHeight<T extends HTMLElement>(): [
  number,
  React.RefObject<T | null>,
] {
  const [height, setHeight] = useState(0);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (elementRef.current) {
        setHeight(elementRef.current.clientHeight); // Get live height
      }
    };

    // Initial height calculation
    updateHeight();

    // Resize listener to track height change
    window.addEventListener("resize", updateHeight);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return [height, elementRef];
}

export default useElementHeight;
