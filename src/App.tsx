import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PageNotFound } from './pages/PageNotFound';
import { UsersPage } from './pages/UsersPage';
import { CreateIssuePage } from './pages/CreateIssuePage';
import RepoPage from './pages/RepoPage';


const App: React.FC = () => {
  return (
    <Router>
      <Switch>
          <Route exact path="/" component={UsersPage} />
          <Route exact path="/users" component={UsersPage} />
          {/* <Route exact path="/users/:slug" component={UserPage} /> */}
          <Route exact path="/repos/:username/:repo/issues" component={RepoPage} />
          <Route exact path="/repos/:repo/issues/create" component={CreateIssuePage} />
          <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
  // return (
  //   <ApolloProvider client={client}>
  //     <RepositoriesList username="john" />
  //   </ApolloProvider>
  // );
};

export default App;