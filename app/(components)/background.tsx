"use client";
import React, { useEffect } from "react";

const Background = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Inject keyframes manually in the browser
    const stylesString = `
      @keyframes rotateSlow {
        from { transform: rotate(45deg); }
        to { transform: rotate(405deg); }
      }
      @keyframes rotateMedium {
        from { transform: rotate(90deg); }
        to { transform: rotate(450deg); }
      }
      @keyframes rotateFast {
        from { transform: rotate(120deg); }
        to { transform: rotate(480deg); }
      }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = stylesString;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet); // Cleanup when component unmounts
    };
  }, []);

  return (
    <main style={styles.container}>
      <div className="relative z-50">{children}</div>
      <div style={{ ...styles.layer, ...styles.layer1 }} />
      <div style={{ ...styles.layer, ...styles.layer2 }} />
      <div style={{ ...styles.layer, ...styles.layer3 }} />
    </main>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    background: "rgb(4,4,4)",
  },
  layer: {
    position: "absolute",
    top: "-50%", // Expand beyond the viewport for smooth cropping
    left: "-50%",
    width: "200%",
    height: "200%",
    backgroundRepeat: "repeat",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
  layer1: {
    backgroundImage: "radial-gradient(white 1px, transparent 1px)",
    opacity: 0.25,
    animation: "rotateSlow 100s linear infinite reverse",
    backgroundSize: "300px 300px",
  },
  layer2: {
    backgroundImage: "radial-gradient(white 3px, transparent 3px)",
    opacity: 0.35,
    animation: "rotateMedium 300s linear infinite",
    backgroundSize: "320px 320px",
  },
  layer3: {
    backgroundImage: "radial-gradient(white 2px, transparent 2px)",
    backgroundSize: "280px 280px",
    opacity: 0.15,
    animation: "rotateFast 200s linear infinite",
  },
};

export default Background;
