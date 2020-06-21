import React, { ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { getRepositories } from '../../api/github';
import { OrderBy, QueryBy, ROWS_PER_PAGE, SortBy } from '../../utils/constants';
import { mapSearchResult } from '../../utils/helper';
import { SearchFilter, SearchResult } from '../../utils/types';

export enum StatusType {
  idle = 'idle',
  success = 'success',
  loading = 'loading',
  error = 'error',
}

export const defaultSearchFilter: SearchFilter = {
  query: '',
  queryBy: QueryBy.name,
  sortBy: SortBy.stars,
  orderBy: OrderBy.desc,
  page: 0,
  rowsPerPage: ROWS_PER_PAGE,
};

export const defaultSearchResult: SearchResult = {
  count: 0,
  repositories: [],
};

type ContextValue = {
  searchResult: SearchResult;
  searchFilter: SearchFilter;
  setSearchResult: (searchResult: SearchResult) => void;
  setSearchFilter: (searchFilter: SearchFilter) => void;
  updateSearchResult: (newSearchFilter: SearchFilter) => void;
  status: StatusType;
};

const RepositoriesContext = React.createContext<ContextValue | undefined>(undefined);

const RepositoriesProvider = ({ children }: { children: ReactNode }) => {
  const [searchResult, setSearchResult] = useState<SearchResult>(defaultSearchResult);
  const [searchFilter, setSearchFilter] = useState<SearchFilter>(defaultSearchFilter);
  const [status, setStatus] = useState<StatusType>(StatusType.idle);
  const firstRun = useRef<boolean>(true);

  const updateSearchResult = useCallback((newSearchFilter: SearchFilter) => {
    const { query, queryBy, sortBy, orderBy, page, rowsPerPage } = newSearchFilter;

    if (!query) return;

    setStatus(StatusType.loading);

    getRepositories({
      query,
      queryBy,
      sortBy,
      orderBy,
      rowsPerPage,
      page: page + 1,
    })
      .then((result) => {
        setStatus(StatusType.success);
        if (result && result.items) {
          const mappedResult: SearchResult = mapSearchResult(result);
          setSearchResult(mappedResult);
        }
      })
      .catch((e) => {
        console.log(e);
        setStatus(StatusType.error);
        setSearchResult(defaultSearchResult);
      });
  }, []);

  useEffect(() => {
    if (!firstRun.current) {
      updateSearchResult(searchFilter);
    }

    if (firstRun.current) {
      firstRun.current = false;
    }
  }, [searchFilter, updateSearchResult]);

  return (
    <RepositoriesContext.Provider
      value={{
        searchResult,
        searchFilter,
        setSearchResult,
        setSearchFilter,
        updateSearchResult,
        status,
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
