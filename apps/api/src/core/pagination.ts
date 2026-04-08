export interface Pagination {
  page: number;
  quantityPerPage: number;
}

export interface PaginationResult<T> {
  data: T[];
  totalCount: number;
  amountOfPages: number;
}
