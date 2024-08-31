import React from "react";
import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  return (
    <Html>
      <span className="canvas-load">
        <p style={{ fontSize: 14, color: "#f1f1f1", marginTop: 40, fontWeight: 800 }}>{useProgress().progress.toFixed(2)}%</p>
      </span>
    </Html>
  );
};

export default Loader;
