import * as React from 'react';

interface PageNotFoundProps {
  location: { pathname: 'string' };
}

export const PageNotFound: React.VFC<PageNotFoundProps> = ({ location }) => (
  <>
    Page not found - the path, <code>{location.pathname}</code>, did not match
    any React Router routes.
  </>
);
