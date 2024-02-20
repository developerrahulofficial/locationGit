import React, { useState, useEffect } from "react";

const TypingAnimation = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(true);

  const cities = ["Delhi.", "Mumbai.", "London.", "Tokyo.", "Miami."];

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setIsCursorVisible((prevIsCursorVisible) => !prevIsCursorVisible);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    if (subIndex === cities[index].length + 1 && !reverse) {
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
        setReverse(true);
      }, 1500);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prevIndex) => (prevIndex + 1) % cities.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prevSubIndex) => prevSubIndex + (reverse ? -1 : 1));
      },
      reverse ? Math.random() * 50 + 50 : Math.random() * 100 + 100
    );

    const speed = reverse ? Math.random() * 50 + 50 : Math.random() * 100 + 100;
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, isPaused]);

  useEffect(() => {
    setText(cities[index].substring(0, subIndex));
  }, [index, subIndex]);

  return (
    <span
      style={{
        minWidth: "19rem",
        display: "inline-block",
        textAlign: "left",
        color: "white",
      }}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            textShadow:
              char === "."
                ? "none"
                : "0 0 5px lightskyblue, 0 0 10px lightskyblue",
          }}
        >
          {char}
        </span>
      ))}
      <div style={{ display: "inline-block" }}>
        <span
          style={{
            display: isCursorVisible ? "block" : "none",
            color: "white",
            textShadow: "none",
            transform: "scale(0.25, 1.05)",
          }}
        >
          l
        </span>
      </div>
    </span>
  );
};

export default TypingAnimation;
