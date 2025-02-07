"use client";
import React from "react";

const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    <main style={styles.container} className="-z-50">
      <div className="z-50">{children}</div>
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
    background: "rgb(12,7,15)",
  },
  layer: {
    position: "absolute",
    top: "-50%", // Expand beyond the viewport for smooth cropping
    left: "-50%",
    width: "200%",
    height: "200%",
    backgroundSize: "200px 200px",
    backgroundRepeat: "repeat",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
  layer1: {
    backgroundImage: "radial-gradient(white 1px, transparent 1px)",
    opacity: 0.7,
    animation: "rotateSlow 160s linear infinite",
  },
  layer2: {
    backgroundImage: "radial-gradient(white 1px, transparent 2px)",
    opacity: 0.4,
    animation: "rotateMedium 140s linear infinite",
  },
  layer3: {
    backgroundImage: "radial-gradient(white 2px, transparent 3px)",
    opacity: 0.3,
    animation: "rotateFast 120s linear infinite",
  },
};

// Inject keyframes manually
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

export default Background;
