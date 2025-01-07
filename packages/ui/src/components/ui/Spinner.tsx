import { CSSProperties } from 'react';

export default function Spinner({
  size = 36,
  width = 2,
  color = 'currentColor',
  className,
  style,
}: {
  size?: number;
  width?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      style={{
        width: `${size}px`,
        height: `${size}px`,
        animation: 'rotate 2s linear infinite',
        zIndex: 2,
        ...style,
      }}
      viewBox="0 0 50 50"
      className={className}
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth={width}
        style={{
          strokeDasharray: '8, 10',
          animation: 'dash 8s ease-in-out infinite',
        }}
      ></circle>
    </svg>
  );
}
