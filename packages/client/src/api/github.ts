import axios from 'axios';
import { QueryBy } from '../utils/constants';
import { SearchFilter } from './../utils/types';

const githubApiUrl = 'https://api.github.com'; // Api base url

export const getSearchUrl = (searchFilter: SearchFilter) => {
  const { query, queryBy, sortBy, orderBy, rowsPerPage, page } = searchFilter;

  const queryStr =
    queryBy === QueryBy.user ? encodeURIComponent(`user:${query}`) : `${query}+in:${queryBy}`;

  return `${githubApiUrl}/search/repositories?q=${queryStr}&sort=${sortBy}&order=${orderBy}&per_page=${rowsPerPage}&page=${page}`;
};

export const getRepositories = async (searchFilter: SearchFilter) => {
  const searchUrl = getSearchUrl(searchFilter);
  return axios.get(searchUrl).then((response) => response.data);
};
