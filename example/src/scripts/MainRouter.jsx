import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { MAIN_ROUTES } from './constants/routes';

const MainRouter = () => (
  <Switch>
    {MAIN_ROUTES.map(route => (
      <Route key={route.path} exact {...route} />
    ))}
    <Redirect from="/" to={MAIN_ROUTES[0].path} />
  </Switch>
);

export default MainRouter;
