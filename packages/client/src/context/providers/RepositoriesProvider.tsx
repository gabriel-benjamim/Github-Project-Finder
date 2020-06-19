import React, { ReactNode, useContext, useState } from 'react';
import { OrderBy, QueryBy, SortBy } from '../../api/github';
import { ROWS_PER_PAGE } from '../../utils/constants';

type SearchResult = {
  count: number;
  repositories: any[]; //TODO: Fix types
};

type SearchParams = {
  query: string;
  queryBy: QueryBy;
  sortBy: SortBy;
  orderBy: OrderBy;
};

type TableParams = {
  page: number;
  rowsPerPage: number;
};

type ContextValue = {
  searchResult: SearchResult;
  searchParams: SearchParams;
  tableParams: TableParams;
  setSearchResult: (searchResult: SearchResult) => void;
  setSearchParams: (searchParams: SearchParams) => void;
  setTableParams: (tableParams: TableParams) => void;
};

const defaultSearchResult: SearchResult = {
  count: 0,
  repositories: [],
};

const defaultSearchParams: SearchParams = {
  query: '',
  queryBy: QueryBy.name,
  sortBy: SortBy.stars,
  orderBy: OrderBy.desc,
};

const defaultTableParams: TableParams = {
  page: 0,
  rowsPerPage: ROWS_PER_PAGE,
};

const RepositoriesContext = React.createContext<ContextValue | undefined>(undefined);

const RepositoriesProvider = ({ children }: { children: ReactNode }) => {
  const [searchResult, setSearchResult] = useState<SearchResult>(defaultSearchResult);
  const [searchParams, setSearchParams] = useState<SearchParams>(defaultSearchParams);
  const [tableParams, setTableParams] = useState<TableParams>(defaultTableParams);

  return (
    <RepositoriesContext.Provider
      value={{
        searchResult,
        searchParams,
        tableParams,
        setSearchResult,
        setSearchParams,
        setTableParams,
      }}
    >
      {children}
    </RepositoriesContext.Provider>
  );
};

const useRepositories = (): ContextValue => {
  const context = useContext(RepositoriesContext);
  if (context === undefined) {
    throw new Error('useRepositories must be used within an RepositoriesProvider');
  }
  return context;
};

export { useRepositories, RepositoriesProvider };
