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
}) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = imageUrl ? [imageUrl] : [mockAvatar];

  const openImageViewer = () => setIsViewerOpen(true);
  const closeImageViewer = () => setIsViewerOpen(false);

  return (
    <div className={`relative min-w-[125px] min-h-[125px] ${customClassName}`}>
      <Image
        className={`object-cover ${small && `rounded-[50%]`} ${
          fullscreen && 'cursor-pointer '
        } ${customImgClassName}`}
        src={imageUrl ? imageUrl : '/mockAvatar.jpg'}
        alt="avatar"
        onClick={openImageViewer}
        fill
        objectFit="responsive"
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
