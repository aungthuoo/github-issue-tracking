import { useEffect, useState } from 'react';
import { SEARCH_ISSUES_IN_REPO } from '../queries';
import { ApolloProvider, useQuery } from '@apollo/client';
import client from '../ApolloClient';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../components/LoadingComponent';
import ErrorComponent from '../components/ErrorComponent';
import NoDataComponent from '../components/NoDataComponent';
import { ReactNode } from 'react';
import OpenIssueForm from '../components/OpenIssueForm';

interface Issue {
  id: string;
  title: string;
  url: string;
  repository?: {
    name?: string;
    owner?: {
      login?: string;
    };
  };
  createdAt: string;
  state: string;
}


interface ApolloProviderComponentProps {
  children: ReactNode; 
}

const ApolloProviderComponent: React.FC<ApolloProviderComponentProps>  = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

const RepoPage: React.FC = () => {
  const { username, repo } = useParams<{ username: string, repo: string }>();

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([]); 
  const [first] = useState<number>(3);

  const [page, setPage] = useState<string | null>(null); // For pagination

  

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const { loading, error, data, fetchMore } = useQuery(SEARCH_ISSUES_IN_REPO, {
    variables: {
      query: debouncedSearchTerm
        ? `repo:${username}/${repo} ${debouncedSearchTerm}`
        : `repo:${username}/${repo}`,
      first,
      after: page,
    },
    onCompleted: (data) => {
      // Store the issues when the data is first loaded
      if (data.search.edges) {
        setIssues(data.search.edges.map(({ node }: { node: Issue }) => node));
        // setAfter(data.search.pageInfo.endCursor);
      }
    },
    client,
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIssues([]); 
    //setAfter(null); 
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1500); // 1.5 second delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);


  if (loading) {
    return (
      <>
        <LoadingComponent/>
      </>
    );
  }


  if (error) {
    return (
      <ErrorComponent message={error.message} />
    );
  }


  {issues.length < 1 && <NoDataComponent/>}


  

  return (
    <>
      <Navbar />
      <div className="max-w-2xl py-3 mx-auto mt-16 ">
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex flex-col items-center py-5">
            <div className="w-full max-w-md mb-4">
              <div className="flex">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-l"
                  placeholder="Search for issues..."
                />
                <button className="p-2 text-white bg-black rounded-r">
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>

        <hr/>
        <div className="flex justify-between py-3">
          <h3 className="text-xl font-bold text-left ">Open Issues</h3>
          <button
            className="px-4 py-2 ml-2 text-sm text-center text-white transition-all border border-transparent rounded-md shadow-md bg-slate-800 hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={togglePopup}
          >
            New Issue 
          </button>
          <ApolloProviderComponent>
            <OpenIssueForm show={isPopupOpen} onClose={togglePopup} />
          </ApolloProviderComponent>
        </div>

        <hr/>



        <ul className="space-y-4">
          {issues.map((node) => (
            <li key={node.id} className="p-4 border rounded-md">
              <a
                href={node.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold text-indigo-600"
              >
                {node.title}
              </a>
              {node.repository && node.repository.owner && (
                <p className="text-sm text-gray-700">
                  Repository: {node.repository.owner.login}/{node.repository.name}
                </p>
              )}
              <div className="mt-2 text-sm text-gray-600">
                State: {node.state} | Created At: {new Date(node.createdAt).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>

        {data?.search.pageInfo.hasNextPage && (
          <div className="flex justify-center mt-6">

            <button
              className="block w-full px-4 py-3 text-center transition ease-in-out delay-75 rounded-lg cursor-pointer bg-slate-100 hover:bg-slate-200"
                onClick={() => {
                  debugger; 
                  setPage(data?.search.pageInfo.endCursor);
                  fetchMore({
                    variables: {
                      first,
                      after: page,
                    }
                  });
                }}
              >
                Next 
            </button>

          </div>
        )}
      </div>
    </>
  );
};

export default RepoPage;
