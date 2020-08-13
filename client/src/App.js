import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

// import { StoreProvider } from './utils/GlobalState';

import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import './App.css';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          {/* <StoreProvider> */}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route component={NoMatch} />
            </Switch>
          {/* </StoreProvider> */}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
