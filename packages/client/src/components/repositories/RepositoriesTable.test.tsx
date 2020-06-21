import { render } from '@testing-library/react';
import React from 'react';
import { ContextValue, RepositoriesContext } from '../../context/providers/RepositoriesProvider';
import { mockRawSearchResult } from '../../test/SearchResultMock';
import { OrderBy, QueryBy, ROWS_PER_PAGE, SortBy, StatusType } from '../../utils/constants';
import { mapSearchResult } from '../../utils/helper';
import { SearchFilter, SearchResult } from '../../utils/types';
import RepositoriesTable from './RepositoriesTable';

const searchResultMock: SearchResult = mapSearchResult(mockRawSearchResult);
const searchFilterMock: SearchFilter = {
  query: 'React',
  queryBy: QueryBy.name,
  sortBy: SortBy.stars,
  orderBy: OrderBy.desc,
  page: 1,
  rowsPerPage: ROWS_PER_PAGE,
};

const contextValue: ContextValue = {
  searchResult: searchResultMock,
  searchFilter: searchFilterMock,
  setSearchResult: jest.fn(),
  setSearchFilter: jest.fn(),
  updateSearchResult: jest.fn(),
  status: StatusType.success,
};

const component = render(
  <RepositoriesContext.Provider value={contextValue}>
    <RepositoriesTable />
  </RepositoriesContext.Provider>
);

test('RepositoriesTable with results ', () => {
  expect(component.getByText('facebook/react')).toBeInTheDocument();
});
