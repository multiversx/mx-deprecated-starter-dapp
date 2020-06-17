import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import Layout from './components/Layout';
import PageNotFoud from './components/PageNotFoud';
import routes from './routes';
import { ContextProvider } from './context';

function App() {
  return (
    <Router>
      <ContextProvider>
        <Layout>
          <Switch>
            {routes.map((route, i) => (
              <Route
                path={route.path}
                key={route.path + i}
                component={route.component}
                exact={true}
              />
            ))}
            <Route component={PageNotFoud} />
          </Switch>
        </Layout>
      </ContextProvider>
    </Router>
  );
}

export default App;
