import Image from 'next/image';
import { FC } from 'react';

const preloader = '/preloader.gif';

interface Props {
  customClassName?: string;
  customImageWidth?: number;
  customImageHeight?: number;
}

const Preloader: FC<Props> = ({
  customClassName,
  customImageHeight,
  customImageWidth,
}) => {
  return (
    <div className={customClassName}>
      <Image
        src={preloader}
        alt="prelaoder"
        width={customImageWidth || 75}
        height={customImageHeight || 75}
      />
    </div>
  );
};

export default Preloader;
