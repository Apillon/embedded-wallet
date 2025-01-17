import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Btn from './Btn';

export default ({
  text = 'Hold to reveal',
  onComplete,
}: {
  text?: string;
  onComplete: () => void;
}) => {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const holdDuration = 1500; // 1.5 seconds in milliseconds
  const intervalTime = 10; // Update every 10ms for smooth animation
  const size = 24; // Size of the circle in pixels
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (isHolding) {
      intervalId = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (intervalTime / holdDuration) * 100;
          if (newProgress >= 100) {
            setIsHolding(false);
            setTimeout(() => onComplete(), 10);
            return 0;
          }
          return newProgress;
        });
      }, intervalTime);
    } else {
      setProgress(0);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isHolding, onComplete]);

  return (
    <Btn
      variant="primary"
      className="w-full !inline-flex items-center justify-center gap-2.5"
      onMouseDown={() => setIsHolding(true)}
      onMouseUp={() => setIsHolding(false)}
      onMouseLeave={() => setIsHolding(false)}
      onTouchStart={() => setIsHolding(true)}
      onTouchEnd={() => setIsHolding(false)}
    >
      <span className="relative">
        <svg
          width={size}
          height={size}
          className={clsx('-rotate-90 absolute right-[calc(100%+10px)]', {
            invisible: !isHolding,
          })}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#06080F" // gray-700
            strokeWidth={strokeWidth - 1}
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#F0F2DA"
            strokeWidth={strokeWidth}
            fill="none"
            // strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
              transition: 'stroke-dashoffset 10ms linear',
            }}
          />
        </svg>

        {text}
      </span>
    </Btn>
  );
};
