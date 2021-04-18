import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import routes from './routes';
import { ContextProvider } from './context';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ContextProvider>
        <Switch>
          {routes.map((route, i) => (
            <Route path={route.path} key={route.path + i} component={route.component} exact={true}>
              <Layout page={route.page}>
                <Route
                  path={route.path}
                  key={route.path + i}
                  component={route.component}
                  exact={true}
                ></Route>
              </Layout>
            </Route>
          ))}
        </Switch>
      </ContextProvider>
    </Router>
  );
}

export default App;
