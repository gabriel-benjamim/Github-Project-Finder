import { mockRawSearchResult } from '../test/SearchResultMock';
import { mapSearchResult } from './helper';
import { SearchResult } from './types';

it('Should parse raw search result to SeachResult format using mapSearchResult', () => {
  const rawSearchResultMock = {
    total_count: 1,
    items: [mockRawSearchResult.items[0]],
  };

  const expectedSearchResult: SearchResult = {
    count: 1,
    repositories: [
      {
        id: 10270250,
        url: 'https://github.com/facebook/react',
        language: 'JavaScript',
        name: 'facebook/react',
        ownerUrl: 'https://github.com/facebook',
        ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/69631?v=4',
        createdAt: '2013-05-24T16:15:54Z',
        stars: 150831,
        forks: 29421,
      },
    ],
  };

  expect(mapSearchResult(rawSearchResultMock)).toEqual(expectedSearchResult);
});
