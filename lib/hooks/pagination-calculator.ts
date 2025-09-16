export function paginationCalculator<T>({ items, pageInfo, pagination }: {
  items?: T[] | null;
  pageInfo: {
    page?: number;
    size?: number;
    totalElements?: number;
    totalPages?: number;
    hasNext?: boolean;
    hasPrevious?: boolean;
  };
  pagination: {
    pageIndex: number;
    pageSize: number;
  }
}) {
  const currentPage = pageInfo?.page ?? 0;
  const totalItems = pageInfo?.totalElements ?? 0;
  const pageSize = pageInfo?.size ?? pagination.pageSize;
  const countOnPage = items?.length ?? 0;
  const start = items?.length ? currentPage * pageSize + 1 : 0;
  const end = items?.length ? currentPage * pageSize + countOnPage : 0;
  const totalPages = pageInfo?.totalPages ?? 1;
  const prevDisabled = !!pageInfo?.hasPrevious;
  const nextDisabled = !!pageInfo?.hasNext;


  console.log("Page data: ", pageInfo);

  console.log(`
    Start: ${start},
    End: ${end},
    Current Page: ${currentPage},
    Page Size: ${pageSize},
    Total Items: ${totalItems},
    Total pages: ${totalPages},
    hasPrevious: ${prevDisabled},
    hasNext: ${nextDisabled}
    `);

  return {
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    start,
    end,
    prevDisabled,
    nextDisabled,
  };
}