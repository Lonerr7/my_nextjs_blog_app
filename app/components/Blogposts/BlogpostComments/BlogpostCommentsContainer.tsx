'use client';

import BlogpostCommentsViewer from './BlogpostCommentsViewer';
import BlogpostCommentInput from './BlogpostCommentInput';
import { useCallback, useRef, useState } from 'react';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { getBlogpostComments } from '@/services/blogServices';
import { setPageNumIfLastElemExists } from '@/utils/setPageNumIfLastElemExists';
import { toast } from 'react-hot-toast';
import { useDebouncedCallback } from 'use-debounce';

interface Props {
  blogpostId: string;
}

const BlogpostCommentsContainer: React.FC<Props> = ({ blogpostId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const { error, hasMore, state, loading, initialLoading, setState, setFirstItemAdded } =
    useInfiniteScroll({
      blogpostId,
      pageNumber: pageNumber,
      searchQuery,
      responseFieldName: 'blogpostComments',
      requestFunc: getBlogpostComments,
    });

  console.log(pageNumber);

  const handleSearch = useDebouncedCallback((searchTerm: string) => {
    setSearchQuery(searchTerm);
    setPageNumber(1);
  }, 400);

  const lastLikedCommentRef = useCallback(
    setPageNumIfLastElemExists({ hasMore, loading, observer, setPageNumber }),

    // eslint-disable-next-line
    [hasMore, loading]
  );

  if (error) {
    toast.error(error);
  }

  return (
    <>
      <BlogpostCommentsViewer
        lastLikedCommentRef={lastLikedCommentRef}
        comments={state}
        handleSearch={handleSearch}
        initialLoading={initialLoading}
        mySessionId="" //!
      />
      <BlogpostCommentInput
        blogpostId={blogpostId}
        setPageNumber={setPageNumber}
        setScrollState={setState}
        setFirstItemAdded={setFirstItemAdded}
      />
    </>
  );
};

export default BlogpostCommentsContainer;
