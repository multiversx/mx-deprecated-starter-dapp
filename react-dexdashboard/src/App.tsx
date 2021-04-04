import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import routes from './routes';
import { ContextProvider } from './context';
import fetchGraphQL from './fetchGraphQL';


function App() {

  const [pairs, setPairs] = useState(null);

  useEffect(() => {
    fetchGraphQL(`
      query {
        pairs {
          token_a
          token_b
          address
          info {
            reserves_a
            reserves_b
            total_supply
          }
          price {
            tokena_price
            tokenb_price
          }
        }
      }
    `).then(response => {
      const data = response.data;
      setPairs(data);
    }).catch(error => {
      console.error(error);
    });
  }, [fetchGraphQL]);

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
