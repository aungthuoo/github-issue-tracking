import { ApolloClient, InMemoryCache } from '@apollo/client';

// const apiKey = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer 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`, // Replace with your GitHub token
  },
});

export default client;