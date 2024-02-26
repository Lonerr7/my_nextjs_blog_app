import { useEffect, useState } from 'react';

export const useInfiniteScroll = ({
  blogpostId,
  pageNumber,
  searchQuery,
  responseFieldName,
  requestFunc,
}: {
  blogpostId: string;
  pageNumber: number;
  searchQuery: string;
  responseFieldName: string;
  requestFunc: ({
    page,
    blogpostId,
    searchQuery,
  }: {
    page?: number | undefined;
    blogpostId: string;
    searchQuery: string;
  }) => any;
}) => {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState('');
  const [state, setState] = useState<any>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setState([]);
  }, [searchQuery]);

  useEffect(() => {
    if (isInitialLoading) {
      setInitialLoading(true);
    }

    setLoading(true);
    setError('');

    requestFunc({
      blogpostId,
      page: pageNumber,
      searchQuery,
    })
      .then((res: any) => {
        if (res[responseFieldName]) {
          setState((prevState: any) => [
            ...prevState,
            ...res[responseFieldName],
          ]);
          setHasMore(res[responseFieldName]?.length > 0);
        }

        if (res.errMsg) {
          throw new Error(res.errMsg);
        }
      })
      .catch((err: Error) => {
        console.error(err);

        setError('Something went wrong! Try again later!');
      })
      .finally(() => {
        if (isInitialLoading) {
          setInitialLoading(false);
          setIsInitialLoading(false);
        }

        setLoading(false);
      });

    // eslint-disable-next-line
  }, [pageNumber, searchQuery]);

  return {
    loading,
    error,
    state,
    hasMore,
    initialLoading,
    setState,
  };
};
