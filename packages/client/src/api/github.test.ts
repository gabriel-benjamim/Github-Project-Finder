import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockRawSearchResult } from '../test/SearchResultMock';
import { OrderBy, QueryBy, ROWS_PER_PAGE, SortBy } from '../utils/constants';
import { SearchFilter } from './../utils/types';
import { getRepositories, getSearchUrl } from './github';

let mockAdap: MockAdapter | undefined = undefined;

describe('Github API repositories search', () => {
  beforeEach(() => {
    mockAdap = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAdap!.restore();
  });

  it('should call a get repositories function (happy path)', () => {
    const mockResult = { ...mockRawSearchResult };
    const searchFilter: SearchFilter = {
      query: 'React',
      queryBy: QueryBy.name,
      sortBy: SortBy.stars,
      orderBy: OrderBy.desc,
      page: 1,
      rowsPerPage: ROWS_PER_PAGE,
    };

    const searchUrl = getSearchUrl(searchFilter);

    const mockAdap = new MockAdapter(axios);

    //stubbing request with mock data
    mockAdap.onGet(searchUrl).reply(200, mockResult);

    const actualPromise: Promise<any> = getRepositories(searchFilter);

    return expect(actualPromise).resolves.toEqual(expect.objectContaining(mockResult));
  });

  it(`should get the expected search url for Query By: ${QueryBy.name}`, () => {
    const mockSearchUrlByName =
      'https://api.github.com/search/repositories?q=NodeJS+in:name&sort=stars&order=desc&per_page=10&page=1';
    const searchFilter: SearchFilter = {
      query: 'NodeJS',
      queryBy: QueryBy.name,
      sortBy: SortBy.stars,
      orderBy: OrderBy.desc,
      page: 1,
      rowsPerPage: ROWS_PER_PAGE,
    };

    const searchUrl = getSearchUrl(searchFilter);

    return expect(searchUrl).toEqual(mockSearchUrlByName);
  });

  it(`should get the expected search url for Query By: ${QueryBy.user}`, () => {
    const mockSearchUrlByUser =
      'https://api.github.com/search/repositories?q=user%3Ahyper-gabriel&sort=stars&order=desc&per_page=10&page=1';
    const searchFilter: SearchFilter = {
      query: 'hyper-gabriel',
      queryBy: QueryBy.user,
      sortBy: SortBy.stars,
      orderBy: OrderBy.desc,
      page: 1,
      rowsPerPage: ROWS_PER_PAGE,
    };

    const searchUrl = getSearchUrl(searchFilter);

    return expect(searchUrl).toEqual(mockSearchUrlByUser);
  });
});
