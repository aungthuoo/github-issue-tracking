import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import client from '../ApolloClient'; 
import { GET_REPOS } from '../queries';

const RepoListByLoadMore: React.FC = () => {
  const [page, setPage] = useState<string | null>(null); // For pagination

  const { loading, error, data, fetchMore } = useQuery(GET_REPOS, {
    variables: {
      login: 'aungthuoo',
      first: 10,
      after: page,
    },
    client, 
  });

 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { nodes: repos, pageInfo } = data.user.repositories;

  return (
    <div>
      <h1>Repositories</h1>
      <ul>
        {repos.map((repo: any) => ( 
          <li key={repo.id}>
            <a href={repo.url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
            <p>{repo.description}</p>
            <p>Language: {repo.primaryLanguage?.name || 'N/A'}</p>
          </li>
        ))}
      </ul>

      {pageInfo.hasNextPage && (
        <button
          onClick={() => {
            setPage(pageInfo.endCursor);
            fetchMore({
              variables: {
                login: 'aungthuoo',
                first: 10,
                after: pageInfo.endCursor,
              },
            });
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default RepoListByLoadMore;