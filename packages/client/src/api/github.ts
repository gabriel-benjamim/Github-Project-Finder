import axios from 'axios';

const githubApiUrl = 'https://api.github.com'; // Api base url

export enum QueryBy {
  name = 'name',
  description = 'description',
  user = 'user',
}
export enum SortBy {
  stars = 'stars',
  forks = 'forks',
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

export const getRepositories = async ({
  query,
  queryBy,
  sortBy,
  orderBy,
  limit,
  page,
}: GetRepositoriesProps) => {
  const queryStr =
    queryBy === QueryBy.user ? encodeURIComponent(`user:${query}`) : `${query}+in:${queryBy}`;
  const repoSearchUrl = `${githubApiUrl}/search/repositories?q=${queryStr}&sort=${sortBy}&order=${orderBy}&per_page=${limit}&page=${page}`;

  return axios.get(repoSearchUrl).then((response) => response.data);
};
