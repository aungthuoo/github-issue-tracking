import * as React from 'react';
import CreateIssueForm from '../components/CreateIssueForm';
import client from '../ApolloClient';
import { ApolloProvider } from '@apollo/client';
import { ReactNode } from 'react';

interface ApolloProviderComponentProps {
  children: ReactNode; // Explicitly typing `children`
}

const ApolloProviderComponent: React.FC<ApolloProviderComponentProps> = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);


export const CreateIssuePage: React.VFC = () => (
  <div className="bg-gray-200 dark:bg-gray-700 ">
    <div>
      <h1 className="header">Repos</h1>
      <ApolloProviderComponent>
        <CreateIssueForm />
      </ApolloProviderComponent>
    </div>
  </div>
);
