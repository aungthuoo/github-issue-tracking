import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_USERS } from "../queries";
import client from '../ApolloClient'; 


interface RequestProps {
  //handleSearch:  () => void,
  handleOnClick:  (username: string) => void 
}


const UserList: React.FC<RequestProps> = ({handleOnClick}) => {
  const [searchQuery, setSearchQuery] = useState('aungthu'); 
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery); 

  // Debounce logic: wait 500ms after the user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Fetch data with the debounced query
  const { loading, error, data } = useQuery(GET_USERS, {
    variables: { searchQuery: debouncedQuery },
    skip: !debouncedQuery, 
    client
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="pl-2 text-xl font-bold">Loading...</p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center py-5"> 
        <div className="w-full max-w-md mb-4"> 
          <div className="flex">
            <input
              type="text"
              placeholder="Search GitHub users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-l"
            />
            <button 
              onClick={() => setDebouncedQuery(searchQuery)} 
              className="p-2 text-white bg-black rounded-r">
              Search
            </button>
          </div>
        </div>
      </div>
      <hr/>

      <div className="flex flex-col py-5">
        <h2 className="pt-5 text-xl font-semibold text-left">Users</h2>
        <div className="max-w-2xl overflow-x-auto">
          
          <div className="flex items-center py-4 space-x-4"> 
            {data?.search?.edges.map((user: any) => (

              <div key={user.node.login} className="min-w-[150px] p-4 bg-white rounded-lg shadow-xs flex flex-col items-center" onClick={() => handleOnClick(user.node.login)}> 

                <img src={user.node.avatarUrl} alt={user.node.login} className="mb-2 rounded-full w-30 h-30" />
                <a href={user.node.url} target="_blank" rel="noopener noreferrer" className="text-center text-blue-500">
                  {user.node.login}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;