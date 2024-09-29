import UserList from '../components/UserList';
import Navbar from '../components/Navbar';
import RepoList from '../components/RepoList';
import React, { useCallback, useState } from 'react';

const UsersPage: React.FC = () => {
  const [username, setUsername] = useState<string>('aungthuoo'); 

  const handleOnclick = useCallback((value: string ) => {
    setUsername(value); 
  }, [username, setUsername]);

  return (
  
      <div className="">
          <Navbar/>
          <div className="max-w-2xl mx-auto mt-16 overflow-hidden bg-white rounded-lg shadow-xs dark:bg-gray-900 dark:text-white">
            <UserList handleOnClick={handleOnclick} />
            <RepoList username={username}/>
          </div>
      </div>
    
  )
}

export {UsersPage}; 
