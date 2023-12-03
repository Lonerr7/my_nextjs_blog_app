'use client';

import { FC, useState } from 'react';

import ImageViewer from 'react-simple-image-viewer';
import Image from 'next/image';

interface Props {
  avatarURL?: string;
  small?: boolean;
  customClassName?: string;
  customWidth?: number;
  customHeight?: number;
  fullscreen?: boolean;
}
const mockAvatar = '/mockAvatar.jpg';

const Avatar: FC<Props> = ({
  avatarURL,
  small,
  customClassName,
  customWidth,
  customHeight,
  fullscreen,
}) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = avatarURL ? [avatarURL] : [mockAvatar];

  const openImageViewer = () => setIsViewerOpen(true);
  const closeImageViewer = () => setIsViewerOpen(false);

  let width: number;
  let height: number;

  if (small) {
    width = 125;
    height = 125;
  } else if (customWidth && customHeight) {
    width = customWidth;
    height = customHeight;
  } else {
    width = 350;
    height = 350;
  }

  return (
    <div
      className={`${customClassName} relative overflow-hidden w-[${width}px] h-[${height}px]`}
    >
      <Image
        className={`${small && `rounded-[50%]`} ${
          fullscreen && 'cursor-pointer'
        } object-cover`}
        src={avatarURL ? avatarURL : '/mockAvatar.jpg'}
        alt="avatar"
        onClick={openImageViewer}
        fill
        objectFit="cover"
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

export default Avatar;
