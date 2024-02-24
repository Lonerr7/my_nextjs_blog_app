import { Dispatch, MutableRefObject, SetStateAction } from 'react';

export const setPageNumIfLastElemExists =
  ({
    loading,
    observer,
    hasMore,
    setPageNumber,
  }: {
    loading: boolean;
    observer: MutableRefObject<IntersectionObserver | null>;
    hasMore: boolean;
    setPageNumber: Dispatch<SetStateAction<number>>;
  }) =>
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
  };
