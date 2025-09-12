import { PageInfo } from "../types/api";

export function paginationCalculator <T>({ items, pageInfo, pagination }: {
    items?: T[] | null;
    pageInfo: PageInfo | null;
    pagination: {
        pageIndex: number;
        pageSize: number;
    }
}) {
  const currentPageZeroBased = pageInfo?.page ?? pagination.pageIndex ?? 0;
  const pageSize = pageInfo?.size ?? pagination.pageSize ?? 10;
  const totalItems = pageInfo?.totalElements;

  const computedFromTotal = totalItems !== undefined ? Math.max(Math.ceil(totalItems / pageSize), 1) : 1;

  const totalPages = pageInfo?.totalPages !== undefined ? Math.max(pageInfo.totalPages, 1) : computedFromTotal;

  const countOnPage = items?.length ?? 0;
  const hasItems = countOnPage > 0;

  const start = hasItems ? currentPageZeroBased * pageSize + 1 : 0;
  const end = hasItems ? currentPageZeroBased * pageSize + countOnPage : 0;

  const prevDisabled = currentPageZeroBased <= 0;
  const nextDisabled = currentPageZeroBased + 1 >= totalPages;

  return {
    currentPageZeroBased,
    pageSize,
    totalPages,
    totalItems,
    start,
    end,
    prevDisabled,
    nextDisabled,
  };
}