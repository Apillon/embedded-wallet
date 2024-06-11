export default function Spinner({
  size = 36,
  width = 2,
  color = 'currentColor',
}: {
  size?: number;
  width?: number;
  color?: string;
}) {
  return (
    <svg
      style={{
        margin: `-${size / 2}px 0 0 -${size / 2}px`,
        width: `${size}px`,
        height: `${size}px`,
        animation: 'rotate 2s linear infinite',
        zIndex: 2,
        position: 'absolute',
        top: '50%',
        left: '50%',
      }}
      viewBox="0 0 50 50"
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
