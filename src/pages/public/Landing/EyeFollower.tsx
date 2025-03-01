import React, { useEffect, useRef } from "react";

const EyeFollower: React.FC = () => {
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const leftTarget = useRef({ x: 49.24, y: 146.94 });
  const rightTarget = useRef({ x: 206.54, y: 146.94 });

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect();
      const viewBox = svg.viewBox.baseVal;
      
      // تبدیل مختصات ماوس به سیستم مختصات SVG
      const scaleX = viewBox.width / rect.width;
      const scaleY = viewBox.height / rect.height;
      const mouseX = (e.clientX - rect.left) * scaleX;
      const mouseY = (e.clientY - rect.top) * scaleY;

      // محاسبات برای چشم چپ
      const leftEyeX = 49.24;
      const leftEyeY = 146.94;
      const deltaXLeft = mouseX - leftEyeX;
      const deltaYLeft = mouseY - leftEyeY;
      const distanceLeft = Math.sqrt(deltaXLeft ** 2 + deltaYLeft ** 2);
      const maxMove = 15;
      
      leftTarget.current = {
        x: leftEyeX + (deltaXLeft / distanceLeft) * Math.min(distanceLeft, maxMove),
        y: leftEyeY + (deltaYLeft / distanceLeft) * Math.min(distanceLeft, maxMove)
      };

      // محاسبات برای چشم راست
      const rightEyeX = 206.54;
      const rightEyeY = 146.94;
      const deltaXRight = mouseX - rightEyeX;
      const deltaYRight = mouseY - rightEyeY;
      const distanceRight = Math.sqrt(deltaXRight ** 2 + deltaYRight ** 2);
      
      rightTarget.current = {
        x: rightEyeX + (deltaXRight / distanceRight) * Math.min(distanceRight, maxMove),
        y: rightEyeY + (deltaYRight / distanceRight) * Math.min(distanceRight, maxMove)
      };
    };

    const animate = () => {
      if (!leftPupilRef.current || !rightPupilRef.current) return;

      // انیمیشن نرم برای چشم چپ
      const leftPupil = leftPupilRef.current;
      const currentXLeft = parseFloat(leftPupil.getAttribute("cx") || "0");
      const currentYLeft = parseFloat(leftPupil.getAttribute("cy") || "0");
      const newXLeft = currentXLeft + (leftTarget.current.x - currentXLeft) * 1;
      const newYLeft = currentYLeft + (leftTarget.current.y - currentYLeft) * 1;
      leftPupil.setAttribute("cx", `${newXLeft}`);
      leftPupil.setAttribute("cy", `${newYLeft}`);

      // انیمیشن نرم برای چشم راست
      const rightPupil = rightPupilRef.current;
      const currentXRight = parseFloat(rightPupil.getAttribute("cx") || "0");
      const currentYRight = parseFloat(rightPupil.getAttribute("cy") || "0");
      const newXRight = currentXRight + (rightTarget.current.x - currentXRight) * 1;
      const newYRight = currentYRight + (rightTarget.current.y - currentYRight) * 1;
      rightPupil.setAttribute("cx", `${newXRight}`);
      rightPupil.setAttribute("cy", `${newYRight}`);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[300px]">
      <svg
        ref={svgRef}
        id="eyes"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 248.95"
        className="w-[200px] h-auto overflow-visible"
      >
        {/* چشم چپ */}
        <ellipse
          className="fill-white"
          cx="71.35"
          cy="124.48"
          rx="71.35"
          ry="124.48"
        />
        <circle className="fill-[#f17304] border" cx="49.24" cy="146.94" r="45.22" />
        <circle
          ref={leftPupilRef}
          className="fill-[#ff9900] border"
          cx="49.24"
          cy="146.94"
          r="37.58"
        />
        <ellipse className="fill-white" cx="40" cy="110" rx="9.65" ry="8.36" />

        {/* چشم راست */}
        <ellipse
          className="fill-white"
          cx="228.65"
          cy="124.48"
          rx="71.35"
          ry="124.48"
        />
        <circle className="fill-[#f17304] border" cx="206.54" cy="146.94" r="45.22" />
        <circle
          ref={rightPupilRef}
          className="fill-[#ff9900] border"
          cx="206.54"
          cy="146.94"
          r="37.58"
        />
        <ellipse className="fill-white" cx="210" cy="120" rx="9.65" ry="8.36" />
      </svg>
    </div>
  );
};

export default EyeFollower;