'use client';

import BlogpostCommentsViewer from './BlogpostCommentsViewer';
import BlogpostCommentInput from './BlogpostCommentInput';
import { useCallback, useRef, useState } from 'react';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { getBlogpostComments } from '@/services/blogServices';
import { setPageNumIfLastElemExists } from '@/utils/setPageNumIfLastElemExists';
import { toast } from 'react-hot-toast';

interface Props {
  blogpostId: string;
  mySessionId: string;
}

const BlogpostCommentsContainer: React.FC<Props> = ({
  blogpostId,
  mySessionId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const { error, hasMore, state, loading, initialLoading, setState } =
    useInfiniteScroll({
      blogpostId,
      pageNumber: pageNumber,
      searchQuery,
      responseFieldName: 'blogpostComments',
      requestFunc: getBlogpostComments,
    });

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
        initialLoading={initialLoading}
        mySessionId={mySessionId}
      />
      <BlogpostCommentInput
        blogpostId={blogpostId}
        setPageNumber={setPageNumber}
        setScrollState={setState}
      />
    </>
  );
};

export default BlogpostCommentsContainer;
