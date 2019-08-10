import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Templates
import TemplateNothing from '../components/Templates/Nothing';

// Routes
import Home from '../components/Home';
import { Settings } from '../components/Settings';

// import Error from '../components/Error';

const Index = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={props => (
        <TemplateNothing pageTitle="Home page">
          <Home {...props} />
        </TemplateNothing>
      )}
    />
    <Route
      exact
      path="/settings"
      render={props => (
        <TemplateNothing pageTitle="Settings">
          <Settings {...props} />
        </TemplateNothing>
      )}
    />
  </Switch>
);

export default Index;
