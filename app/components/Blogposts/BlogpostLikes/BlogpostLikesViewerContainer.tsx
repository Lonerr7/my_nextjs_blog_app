'use client';

import { useCallback, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import BlogpostLikesViewer from './BlogpostLikesViewer';
import { useBlogpostLikes } from '@/hooks/useBlogpostLikes';
import { useDebouncedCallback } from 'use-debounce';

interface Props {
  blogpostId: string;
  mySessionId: string;
}

const BlogpostLikesViewerContainer: React.FC<Props> = ({
  blogpostId,
  mySessionId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const { error, hasMore, likedUsers, loading, initialLoading } =
    useBlogpostLikes({
      blogpostId,
      pageNumber: pageNumber,
      searchQuery,
    });

  const handleSearch = useDebouncedCallback((searchTerm: string) => {
    setSearchQuery(searchTerm);
    setPageNumber(1);
  }, 400);

  const lastLikedUserRef = useCallback(
    (node: any) => {
      if (loading) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNum) => prevPageNum + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },

    // eslint-disable-next-line
    [hasMore, loading]
  );

  if (error) {
    toast.error(error);
  }

  return (
    <BlogpostLikesViewer
      likedUsers={likedUsers}
      mySessionId={mySessionId}
      lastLikedUserRef={lastLikedUserRef}
      handleSearch={handleSearch}
      initialLoading={initialLoading}
    />
  );
};

export default BlogpostLikesViewerContainer;
