import axios from 'axios';
import { ROWS_PER_PAGE } from '../utils/constants';

let githubApiUrl = 'https://api.github.com'; // Api base url

export enum QueryBy {
  name = 'name',
  description = 'description',
  owner = 'owner',
}
export enum SortBy {
  stars = 'stars',
  forks = 'forks',
  updated = 'updated',
}
export enum OrderBy {
  asc = 'asc',
  desc = 'desc',
}

type GetRepositoriesProps = {
  query: string;
  queryBy: QueryBy;
  sortBy: SortBy;
  orderBy: string;
  limit: number;
  page: number;
};

export const getRepositories = ({
  query = '',
  queryBy = QueryBy.name,
  sortBy = SortBy.stars,
  orderBy = OrderBy.desc,
  limit = ROWS_PER_PAGE,
  page = 0,
}: GetRepositoriesProps) => {
  const repoSearchUrl = `${githubApiUrl}/search/repositories?q=${query}+in:${queryBy}&sort=${sortBy}&order=${orderBy}&per_page=${limit}&page=${page}`;
  return axios.get(repoSearchUrl).then((response) => response.data);
};
