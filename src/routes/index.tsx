import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import RuralProperty from '../pages/RuralProperty';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/RuralProperty" exact component={RuralProperty} />

  </Switch>
);

export default Routes;
