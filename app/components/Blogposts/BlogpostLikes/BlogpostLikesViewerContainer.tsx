'use client';

import { useCallback, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import BlogpostLikesViewer from './BlogpostLikesViewer';
import { useBlogpostLikes } from '@/hooks/useBlogpostLikes';

interface Props {
  blogpostId: string;
  mySessionId: string;
}

const BlogpostLikesViewerContainer: React.FC<Props> = ({
  blogpostId,
  mySessionId,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const { error, hasMore, likedUsers, loading } = useBlogpostLikes({
    blogpostId,
    pageNumber: pageNumber,
  });

  console.log(pageNumber);
  

  const lastLikedUserRef = useCallback(
    (node) => {
      if (loading) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNum) => prevPageNum + 1);
          console.log(`page 2`);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },

    // eslint-disable-next-line
    [hasMore, loading]
  );

  return (
    <BlogpostLikesViewer
      likedUsers={likedUsers}
      mySessionId={mySessionId}
      lastLikedUserRef={lastLikedUserRef}
    />
  );
};

export default BlogpostLikesViewerContainer;
