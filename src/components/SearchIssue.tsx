import { useEffect, useState } from 'react';
import client from '../ApolloClient'; 
import {  SEARCH_ISSUES_IN_REPO } from '../queries';
import { useQuery } from '@apollo/client';


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

const SearchIssue: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // const { loading, error, data } = useQuery(SEARCH_ISSUES, {
  //   variables: { query: searchTerm },
  //   skip: !searchTerm, 
  //   client
  // });
  const { loading, error, data } = useQuery(SEARCH_ISSUES_IN_REPO, {
    variables: {
      query: `repo:aungthuoo/dev_note_snippets ${debouncedSearchTerm}`, // Adjust this to your repo owner and name
    },
    // skip: !searchTerm, 
    skip: !debouncedSearchTerm,
    client
  });
  

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // The useQuery hook will refetch automatically when searchTerm changes
  };



  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm); // Update debounced search term after delay
    }, 1500); // 500ms delay

    // Cleanup the timeout if the searchTerm changes before the delay ends
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);


  return (
    <div className="max-w-2xl py-3 mx-auto">

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex flex-col items-center py-5"> {/* Center the entire component */}
          <div className="w-full max-w-md mb-4"> {/* Max width for the search bar */}
            <div className="flex">
              
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-l"
                placeholder="Search for issues..."
              />
              
              <button 
                onClick={() => setSearchTerm(searchTerm)} 
                className="p-2 text-white bg-black rounded-r">
                Search
              </button>

            </div>
          </div>
        </div>
      </form>


      



      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      <ul className="space-y-4">
        {data?.search.edges.map(({ node }: { node: Issue }) => (
          <li key={node.id} className="p-4 border rounded-md">
            <a href={node.url} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-indigo-600">
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
    </div>
  );
};

export default SearchIssue;