import { $, useStore } from "@builder.io/qwik";

interface PaginationState {
  currentPage: number;
  pageSize: number;
  total: number;
}

interface PaginationActions {
  nextPage: () => void;
  prevPage: () => void;
  jumpToPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

export default function usePagination(
  initialState: PaginationState
): [PaginationState, PaginationActions] {
  const paginationStore = useStore(initialState);

  const nextPage = $(() => {
    paginationStore.currentPage++;
  });

  const prevPage = $(() => {
    paginationStore.currentPage--;
  });

  const jumpToPage = $((page: number) => {
    paginationStore.currentPage = page;
  });

  const setPageSize = $((size: number) => {
    paginationStore.pageSize = size;
  });

  return [paginationStore, { nextPage, prevPage, jumpToPage, setPageSize }];
}
