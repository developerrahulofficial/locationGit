import createGlobe from "cobe";
import { useEffect, useRef } from "react";

//Search page auto-rotating globe component - taking too much memory
const defaultCoordinates = [51.507351, -0.127758];
function Cobe({ coordinates = defaultCoordinates }) {
  const canvasRef = useRef();
  const locationToAngles = (lat, long) => {
    return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180];
  };

  const focusRef = useRef(locationToAngles(...coordinates));

  useEffect(() => {
    focusRef.current = locationToAngles(...coordinates);
    let width = 0;
    let currentPhi = 0;
    let currentTheta = 0;
    const doublePi = Math.PI * 2;
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 1,
      theta: 0,
      dark: 1,
      diffuse: 2,
      mapSamples: 14000,
      mapBrightness: 8,
      baseColor: [0.1, 0.1, 0.1],
      markerColor: [0.815, 0.904, 0.99],
      glowColor: [0.63, 0.808, 0.98],
      markers: [{ location: coordinates, size: 0.075 }],
      onRender: (state) => {
        state.phi = currentPhi;
        state.theta = currentTheta;
        const [focusPhi, focusTheta] = focusRef.current;
        const distPositive = (focusPhi - currentPhi + doublePi) % doublePi;
        const distNegative = (currentPhi - focusPhi + doublePi) % doublePi;
        if (distPositive < distNegative) {
          currentPhi += distPositive * 0.08;
        } else {
          currentPhi -= distNegative * 0.08;
        }
        currentTheta = currentTheta * 0.92 + focusTheta * 0.08;
        state.width = width * 2;
        state.height = width * 2;
      },
    });
    setTimeout(() => (canvasRef.current.style.opacity = "1"));
    return () => globe.destroy();
  }, [coordinates]);
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 650,
        aspectRatio: 1,
        position: "fixed",
        right: 0,
        zIndex: 0,
        marginTop: "4rem",
        marginRight: "5rem",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 1s ease",
        }}
      />
    </div>
  );
}
export default Cobe;
