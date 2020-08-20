import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import './App.css';
import Header from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Detail from './pages/Detail';
import ExerciseList from './components/ExerciseList';
import Workout from './pages/Workout';
import MyWorkouts from './pages/MyWorkouts';

import { StoreProvider } from './utils/GlobalState';


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
        <div className="container">
          <Header></Header>
          <StoreProvider>
            <Switch key="Switch">
              <Route exact path="/" component={Home} key="Home" />
              <Route exact path="/login" component={Login} key="Login" />
              <Route exact path="/signup" component={Signup} key="Signup" />
              <Route exact path="/list" component={ExerciseList} key="ExerciseList" />
              <Route exact path="/exercise/:id" component={Detail} key= "Detail" />
              <Route exact path="/workout" component={Workout} key="Workout" />
              <Route exact path="/myworkouts" component={MyWorkouts} key="MyWorkouts" />

              <Route component={NoMatch} />
            </Switch>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
