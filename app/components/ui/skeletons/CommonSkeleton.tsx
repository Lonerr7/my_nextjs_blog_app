'use client';

import { useTheme } from 'next-themes';
import Skeleton from 'react-loading-skeleton';

interface Props {
  width?: string;
  height?: string;
  containerClassName?: string;
  className?: string;
  count?: number;
  borderRadius?: string;
}

const CommonSkeleton: React.FC<Props> = ({
  width,
  height,
  className,
  containerClassName,
  count,
  borderRadius,
}) => {
  const { theme } = useTheme();

  return (
    <Skeleton
      containerClassName={containerClassName}
      className={className}
      width={width}
      height={height}
      baseColor={theme === 'dark' ? '#2e2f40' : '#ebebeb'}
      highlightColor={theme === 'dark' ? '#22222f' : '#f5f5f5'}
      count={count}
      borderRadius={borderRadius}
    />
  );
};

export default CommonSkeleton;
