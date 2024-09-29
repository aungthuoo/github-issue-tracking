
import { gql } from '@apollo/client';

const GET_USER_REPOS = gql`
  query GetUserRepos($username: String!, $cursor: String) {
    user(login: $username) {
      repositories(first: 10, after: $cursor) {
        nodes {
          name
          url
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;


const GET_USERS = gql`
  query GetUsers($searchQuery: String!) {
    search(query: $searchQuery, type: USER, first: 10) {
      edges {
        node {
          ... on User {
            login
            avatarUrl
            url
          }
        }
      }
    }
  }
`;


const GET_REPOS = gql`
  query GetUserRepos($login: String!, $first: Int!, $after: String) {
    user(login: $login) {
      repositories(first: $first, after: $after) {
        nodes {
          id
          name
          description
          url
          primaryLanguage {
            name
          }
          stargazerCount 
          watchers {      
            totalCount
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;


const GET_REPO_ISSUES = gql`
  query GetRepoIssues($owner: String!, $name: String!, $first: Int!, $after: String) {
    repository(owner: $owner, name: $name) {
      issues(first: $first, after: $after) {
        nodes {
          id
          title
          body
          url
          state
          createdAt
          author {
            login
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;


const CREATE_ISSUE = gql`
  mutation CreateIssue($input: CreateIssueInput!) {
    createIssue(input: $input) {
      issue {
        id
        number
        title
        url
      }
    }
  }
`;


const SEARCH_ISSUES = gql`
  query SearchIssues($query: String!) {
    search(query: $query, type: ISSUE, first: 10) {
      edges {
        node {
          ... on Issue {
            id
            title
            url
            repository {
              name
              owner {
                login
              }
            }
            createdAt
            state
          }
        }
      }
    }
  }
`;


const SEARCH_ISSUES_IN_REPO = gql`
  query SearchIssuesInRepo($query: String!, $first: Int, $after: String) {
    search(query: $query, type: ISSUE, first: $first, after: $after) {
      edges {
        node {
          ... on Issue {
            id
            title
            url
            repository {
              name
              owner {
                login
              }
            }
            createdAt
            state
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
`;


export {
  GET_USER_REPOS, 
  GET_USERS,
  GET_REPOS, 
  GET_REPO_ISSUES, 
  CREATE_ISSUE,
  SEARCH_ISSUES,
  SEARCH_ISSUES_IN_REPO
}