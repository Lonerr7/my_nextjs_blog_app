'use client';

import { FC, useState } from 'react';

import ImageViewer from 'react-simple-image-viewer';
import Image from 'next/image';

interface Props {
  avatarURL?: string;
  small?: boolean;
  customClassName?: string;
  fullscreen?: boolean;
}
const mockAvatar = '/mockAvatar.jpg';

const Avatar: FC<Props> = ({
  avatarURL,
  small,
  customClassName,
  fullscreen,
}) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = avatarURL ? [avatarURL] : [mockAvatar];

  const openImageViewer = () => setIsViewerOpen(true);
  const closeImageViewer = () => setIsViewerOpen(false);

  return (
    <div className={`relative min-w-[125px] min-h-[125px] ${customClassName}`}>
      <Image
        className={`object-cover ${small && `rounded-[50%]`} ${
          fullscreen && 'cursor-pointer'
        }`}
        src={avatarURL ? avatarURL : '/mockAvatar.jpg'}
        alt="avatar"
        onClick={openImageViewer}
        fill
        sizes="125px"
        priority
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
