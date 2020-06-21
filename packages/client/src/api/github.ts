import axios from 'axios';
import { QueryBy } from '../utils/constants';
import { SearchFilter } from './../utils/types';

const githubApiUrl = 'https://api.github.com'; // Api base url

export const getRepositories = async (searchFilter: SearchFilter) => {
  const { query, queryBy, sortBy, orderBy, rowsPerPage, page } = searchFilter;

  const queryStr =
    queryBy === QueryBy.user ? encodeURIComponent(`user:${query}`) : `${query}+in:${queryBy}`;
  const repoSearchUrl = `${githubApiUrl}/search/repositories?q=${queryStr}&sort=${sortBy}&order=${orderBy}&per_page=${rowsPerPage}&page=${page}`;

  return axios.get(repoSearchUrl).then((response) => response.data);
};
