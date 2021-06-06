import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useGlobalContext } from '../../Store';

const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {
  const { isLoggedIn } = useGlobalContext();

  return isLoggedIn ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/" />
  );
};
export default PrivateRoute;
