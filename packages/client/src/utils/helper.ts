import { SearchResult } from './types';

const mapSearchResult = (rawResult: { total_count: number; items: any[] }) => {
  const mappedResult: SearchResult = {
    count: rawResult.total_count,
    repositories: rawResult.items.map((rawItem: any) => ({
      id: rawItem.id,
      url: rawItem.html_url,
      name: rawItem.full_name,
      language: rawItem.language,
      ownerUrl: rawItem.owner.html_url,
      ownerAvatarUrl: rawItem.owner.avatar_url,
      createdAt: rawItem.created_at,
      stars: rawItem.stargazers_count,
      forks: rawItem.forks,
    })),
  };

  return mappedResult;
};

export { mapSearchResult };
