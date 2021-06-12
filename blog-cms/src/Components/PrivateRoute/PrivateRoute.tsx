import React from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { useGlobalContext } from '../../Store';

type RouteParams = {
  component: React.FC;
  path: string;
  exact?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PrivateRoute: React.FC<RouteParams & RouteComponentProps<any>> = (
  props
) => {
  const { isLoggedIn } = useGlobalContext();

  return isLoggedIn ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/" />
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default PrivateRoute as React.ComponentType<any>;
