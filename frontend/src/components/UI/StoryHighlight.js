import React, { useEffect, useRef } from "react";

const StoryHighlight = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.height = 250;
    canvas.width = 250;
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "#f9ce34");
    gradient.addColorStop(1, "#ee2a7b");
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 5;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 107;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default StoryHighlight;
