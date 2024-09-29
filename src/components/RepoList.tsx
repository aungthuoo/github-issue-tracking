import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import client from '../ApolloClient'; 
import { GET_REPOS } from '../queries';
import { Link } from 'react-router-dom';
import LoadingComponent from './LoadingComponent';
import ErrorComponent from './ErrorComponent';
import NoDataComponent from './NoDataComponent';

interface RequestProps {
  username: string;
}


const RepoList: React.FC<RequestProps> = React.memo(({ username }) => {
  const [page, setPage] = useState<string | null>(null); 

  const { loading, error, data, fetchMore } = useQuery(GET_REPOS, {
    variables: {
      login: username,
      first: 10,
      after: page,
    },
    client, 
  });

 
  if (!username) {
    return <div>No username provided</div>; // Handle the case where username is null
  }
  
  if (loading) {
    return (
      <LoadingComponent/>
    );
  }


  if (error) {
    return (
      <ErrorComponent message={error.message} />
    );
  }

  const { nodes: repos, pageInfo } = data.user.repositories;


  if (repos.length < 1) {
    return (
      <NoDataComponent />
    );
  }

  return (
    <div>
      <h2 className="py-5 text-xl font-semibold text-left">Repositories</h2>
      <ul>
        {repos.map((repo: any) => ( 
          <li key={repo.id} className="flex justify-between p-4 py-5 my-2 border rounded-md space-between">
          <Link
            to={{ pathname: `/repos/${username}/${repo.name}/issues` }}
            className="font-medium transition ease-in-out delay-75 cursor-pointer"
          >
            {repo.name}
          </Link>
          <span>{repo.stargazerCount} stars / {repo.watchers.totalCount} watching</span>
          </li>
        ))}
      </ul>

      {pageInfo.hasNextPage && (
        <div className="max-w-xl py-5 mx-auto overflow-hidden rounded-lg shadow-xs">
          <div className="flex justify-center max-w-xl">
            <button
            className="block w-full px-4 py-3 text-center transition ease-in-out delay-75 rounded-lg cursor-pointer bg-slate-100 hover:bg-slate-200"
              onClick={() => {
                setPage(pageInfo.endCursor);
                fetchMore({
                  variables: {
                    login: `${username}`,
                    first: 10,
                    after: pageInfo.endCursor,
                  },
                });
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>

  );
});

export default RepoList;