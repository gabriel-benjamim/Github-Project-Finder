import { OrderBy, QueryBy, SortBy } from './constants';

export type Repository = {
  id: number;
  url: string;
  name: string;
  language: string;
  ownerUrl: string;
  ownerAvatarUrl: string;
  createdAt: string;
  stars: number;
  forks: number;
};

export type SearchResult = {
  count: number;
  repositories: Repository[];
};

export type SearchFilter = {
  query: string;
  queryBy: QueryBy;
  sortBy: SortBy;
  orderBy: OrderBy;
  page: number;
  rowsPerPage: number;
};
