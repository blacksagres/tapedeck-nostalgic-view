import { useState } from 'react';

type UsePaginationReturn = {
  currentPage: number;
  totalPages: number;
  setNextPage: () => void;
  setPreviousPage: () => void;
  nextEnabled: boolean;
  previousEnabled: boolean;
  resetPagination: () => void;
};

export const usePagination = (
  totalItems: number,
  itemsPerPage: number
): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const setNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const setPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  /**
   * When the user changes the filters, the pagination should be reset to the first page.
   */
  const resetPagination = () => {
    setCurrentPage(1);
  };

  const nextEnabled = currentPage < totalPages;
  const previousEnabled = currentPage > 1;

  return {
    currentPage,
    totalPages,
    setNextPage,
    setPreviousPage,
    nextEnabled,
    previousEnabled,
    resetPagination,
  };
};
