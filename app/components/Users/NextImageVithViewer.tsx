'use client';

import { FC, useState } from 'react';
import ImageViewer from 'react-simple-image-viewer';
import Image from 'next/image';

interface Props {
  imageUrl?: string;
  small?: boolean;
  customClassName?: string;
  customImgClassName?: string;
  fullscreen?: boolean;
  sizes: string;
  alt: string;
  blurDataUrl?: string;
}
const mockAvatar = '/mockAvatar.jpg';

const NextImageVithViewer: FC<Props> = ({
  imageUrl,
  small,
  customClassName,
  customImgClassName,
  fullscreen,
  sizes,
  blurDataUrl,
  alt,
}) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = imageUrl ? [imageUrl] : [mockAvatar];

  const openImageViewer = () => setIsViewerOpen(true);
  const closeImageViewer = () => setIsViewerOpen(false);

  return (
    <div className={`relative min-h-[125px] min-w-[125px] ${customClassName}`}>
      <Image
        className={`${small && `rounded-[50%]`}  ${
          fullscreen && 'cursor-pointer '
        } ${customImgClassName}`}
        style={{
          objectFit: 'cover',
        }}
        src={imageUrl ? imageUrl : '/mockAvatar.jpg'}
        alt={alt}
        onClick={openImageViewer}
        fill
        sizes={sizes}
        priority
        placeholder={blurDataUrl ? 'blur' : 'empty'}
        blurDataURL={blurDataUrl ? blurDataUrl : undefined}
      />
      {fullscreen && isViewerOpen ? (
        <ImageViewer
          src={images}
          onClose={closeImageViewer}
          backgroundStyle={{
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 200,
            padding: 50,
          }}
          closeOnClickOutside={true}
          disableScroll
        />
      ) : null}
    </div>
  );
};

export default NextImageVithViewer;
