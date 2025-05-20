import React from "react";

interface LevelProgressProps {
  experience: number;
  size?: number; // opcional, tamaño del círculo
}

export const LevelProgress: React.FC<LevelProgressProps> = ({ experience, size = 100 }) => {
  const level = Math.floor(experience / 1000);
  const expInLevel = experience % 1000;
  const progress = (expInLevel / 1000) * 100;

  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth="10"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#8B5CF6"
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-lg font-bold text-gray-800">Nv {level}</p>
        <p className="text-xs text-gray-500">{expInLevel} / 1000</p>
      </div>
    </div>
  );
};
