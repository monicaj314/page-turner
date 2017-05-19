import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import BookDetails from './components/BookDetails'
import NotFound from './components/Shared/NotFound'

const Routes = (props) => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/book" component={BookDetails} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
