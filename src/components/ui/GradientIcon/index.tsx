import React, { useId } from "react";

interface GradientIconProps {
  icon: React.ElementType;
  size?: number;
  className?: string;
  fromColor?: string;
  toColor?: string;
  direction?: "top" | "bottom" | "left" | "right";
}

const GradientIcon = ({
  icon: Icon,
  size = 20,
  className = "",
  fromColor = "#E400FB",
  toColor = "#5200FD",
  direction = "bottom",
}: GradientIconProps) => {
  const gradientId = useId();

  const coords = {
    right: { x1: "0%", y1: "0%", x2: "100%", y2: "0%" },
    left: { x1: "100%", y1: "0%", x2: "0%", y2: "0%" },
    bottom: { x1: "0%", y1: "0%", x2: "0%", y2: "100%" },
    top: { x1: "0%", y1: "100%", x2: "0%", y2: "0%" },
  }[direction];

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={gradientId} {...coords}>
            <stop offset="0%" stopColor={fromColor} />
            <stop offset="100%" stopColor={toColor} />
          </linearGradient>
        </defs>
      </svg>

      <Icon
        size={size}
        className={className}
        style={{ fill: `url(#${gradientId})` }}
      />
    </div>
  );
};

export default GradientIcon;
