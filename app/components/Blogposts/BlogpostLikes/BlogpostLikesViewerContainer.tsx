'use client';

import { useCallback, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import BlogpostLikesViewer from './BlogpostLikesViewer';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useDebouncedCallback } from 'use-debounce';
import { getSingleBlogpostLikes } from '@/services/blogServices';
import { setPageNumIfLastElemExists } from '@/utils/setPageNumIfLastElemExists';

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
  const { error, hasMore, state, loading, initialLoading } = useInfiniteScroll({
    blogpostId,
    pageNumber: pageNumber,
    searchQuery,
    responseFieldName: 'blogpostLikes',
    requestFunc: getSingleBlogpostLikes,
  });

  const handleSearch = useDebouncedCallback((searchTerm: string) => {
    setSearchQuery(searchTerm);
    setPageNumber(1);
  }, 400);

  const lastLikedUserRef = useCallback(
    setPageNumIfLastElemExists({ hasMore, loading, observer, setPageNumber }),

    // eslint-disable-next-line
    [hasMore, loading]
  );

  if (error) {
    toast.error(error);
  }

  return (
    <BlogpostLikesViewer
      likedUsers={state}
      mySessionId={mySessionId}
      lastLikedUserRef={lastLikedUserRef}
      handleSearch={handleSearch}
      initialLoading={initialLoading}
    />
  );
};

export default BlogpostLikesViewerContainer;
