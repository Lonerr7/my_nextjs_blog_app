import { getBlogpostComments } from '@/services/blogServices';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-hot-toast';

export const refetchComments = async ({
  blogpostId,
  errMessage,
  pageNumber,
  successMessage,
  setPageNumber,
  setScrollState,
}: {
  blogpostId: string;
  errMessage: string | null;
  pageNumber: number;
  successMessage: string;
  setScrollState: Dispatch<any>;
  setPageNumber: Dispatch<SetStateAction<number>>;
}) => {
  if (!errMessage) {
    toast.success(successMessage);

    if (pageNumber >= 2) {
      setPageNumber(1);
      setScrollState([]);
      return;
    }

    // Manually refetching comments when created a new one
    const { blogpostComments } = await getBlogpostComments({
      blogpostId,
      page: 1,
      searchQuery: '',
    });

    if (blogpostComments) {
      setScrollState(blogpostComments);
    }
  } else {
    toast.error(errMessage);
  }
};
