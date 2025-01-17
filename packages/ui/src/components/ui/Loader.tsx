import clsx from 'clsx';
import { useEffect, useState, useMemo } from 'react';

export default ({
  size = 36,
  fill = '#F0F2DA',
  className,
}: {
  size?: number;
  fill?: string;
  className?: string;
}) => {
  const [i, setI] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setI(prev => (prev > 200 ? 0 : prev + 1));
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const dotLeft = useMemo(() => {
    if (i < 30) {
      return 'M110 140C126.569 140 140 126.569 140 110C140 93.4315 126.569 80 110 80C93.4315 80 80 93.4315 80 110C80 126.569 93.4315 140 110 140Z';
    } else if (i < 40) {
      return 'M50 140C66.5685 140 80 126.569 80 110C80 93.4315 66.5685 80 50 80C33.4315 80 20 93.4315 20 110C20 126.569 33.4315 140 50 140Z';
    } else if (i < 95) {
      return 'M50 140C66.5685 140 80 126.569 80 110C80 93.4315 66.5685 80 50 80C33.4315 80 20 93.4315 20 110C20 126.569 33.4315 140 50 140Z';
    }
    return '';
  }, [i]);

  const dotCenter = useMemo(() => {
    return i < 95
      ? 'M110 140C126.569 140 140 126.569 140 110C140 93.4315 126.569 80 110 80C93.4315 80 80 93.4315 80 110C80 126.569 93.4315 140 110 140Z'
      : '';
  }, [i]);

  const dotRight = useMemo(() => {
    if (i < 30) {
      return 'M110 140C126.569 140 140 126.569 140 110C140 93.4315 126.569 80 110 80C93.4315 80 80 93.4315 80 110C80 126.569 93.4315 140 110 140Z';
    } else if (i < 40) {
      return 'M170 140C186.569 140 200 126.569 200 110C200 93.4315 186.569 80 170 80C153.431 80 140 93.4315 140 110C140 126.569 153.431 140 170 140Z';
    } else if (i < 95) {
      return 'M170 140C186.569 140 200 126.569 200 110C200 93.4315 186.569 80 170 80C153.431 80 140 93.4315 140 110C140 126.569 153.431 140 170 140Z';
    }
    return '';
  }, [i]);

  const triangleLeft = useMemo(() => {
    if (i < 98) return 'M110 88V133L92 110.5L110 88Z';
    if (i < 120) return 'M110 35V185L50 110L110 35Z';
    if (i < 130) return 'M110 50V170L50 110L110 50Z';
    if (i < 140) return 'M110 35V185L50 110L110 35Z';
    return 'M190 50V170L110 110L190 50Z';
  }, [i]);

  const triangleRight = useMemo(() => {
    if (i < 98) return 'M110 133V88L128 110.5L110 133Z';
    if (i < 120) return 'M110 185V35L170 110L110 185Z';
    if (i < 130) return 'M110 170V50L170 110L110 170Z';
    if (i < 140) return 'M110 185V35L170 110L110 185Z';
    return 'M30 170V50L110 110L30 170Z';
  }, [i]);

  return (
    <div className={clsx('animation-loader', className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={dotRight} fill={fill} />
        <path d={dotCenter} fill={fill} />
        <path d={dotLeft} fill={fill} />
        <path d={triangleLeft} fill={fill} />
        <path d={triangleRight} fill={fill} />
      </svg>
    </div>
  );
};
