import React, { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";

function GlobeComponent() {
  const canvasRef = useRef(null);
  const [isGlobeInitialized, setGlobeInitialized] = useState(false);
  let globe;
  let phi = 0;

  useEffect(() => {
    if (canvasRef.current) {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 1,
        width: 1000,
        height: 1000,
        phi: 1,
        theta: 0,
        dark: 1,
        diffuse: 1,
        scale: 1,
        mapSamples: 6000,
        mapBrightness: 8,
        baseColor: [0.1, 0.1, 0.1],
        markerColor: [0.815, 0.904, 0.99],
        glowColor: [0.63, 0.808, 0.98],
        offset: [0, 0],
        markers: [],
        onRender: (state) => {
          state.phi = phi;
          phi += 0.0075;
          if (!isGlobeInitialized) {
            setGlobeInitialized(true);
          }
        },
      });

      return () => {
        if (globe && globe.destroy) {
          globe.destroy();
        }
      };
    }
  }, []);

  useEffect(() => {
    if (isGlobeInitialized) {
      canvasRef.current.style.transition = "opacity 0.0s ease-out";
      canvasRef.current.style.opacity = 1;
    }
  }, [isGlobeInitialized]);

  return (
    <canvas
      ref={canvasRef}
      id="cobe"
      className={`z-0 mx-auto ${isGlobeInitialized ? "fade" : ""}`}
      style={{
        width: "1000px",
        height: "1000px",
        opacity: 0,
        backgroundColor: "transparent",
      }}
      width="1000"
      height="1000"
    />
  );
}

export default GlobeComponent;
