import React from "react";

const CircularButtonGroup = ({ buttons }) => {
  const angle = 360 / buttons.length; // Calculate angle between buttons
  const radius = 100; // Radius of the circular layout

  return (
    <div className="relative w-[250px] h-[250px] rounded-full bg-gray-200 mx-auto flex items-center justify-center">
      {/* Inner Circle */}
      <div className="absolute w-[100px] h-[100px] bg-white rounded-full"></div>

      {/* Buttons */}
      {buttons.map((button, index) => {
        const rotation = angle * index;
        const x = Math.sin((rotation * Math.PI) / 180) * radius;
        const y = -Math.cos((rotation * Math.PI) / 180) * radius;

        return (
          <button
            key={index}
            onClick={button.onClick}
            className="absolute w-[80px] h-[80px] rounded-full bg-blue-500 text-white flex items-center justify-center"
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            {button.label}
          </button>
        );
      })}
    </div>
  );
};

export default CircularButtonGroup;
