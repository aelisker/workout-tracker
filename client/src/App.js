import React from 'react';
<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
=======
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import './App.css';
import Header from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WorkoutSets from './pages/WorkoutSets';
import Detail from './pages/Detail';
import ExerciseList from './components/ExerciseList';

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
          <Header></Header>
          {/* <StoreProvider> */}
            <Switch>
              <Route 
              // currentWorkout = {currentWorkout}
              // setCurrentWorkout = {setCurrentWorkout}
              exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/5f38a4b9dbfed8512853da6d" component={WorkoutSets} />
              <Route exact path="/5f38a4b9dbfed8512853da6c" component={WorkoutSets} />
              <Route exact path="/list" component={ExerciseList} />
              <Route exact path="/exercise/:id" component={Detail} />

              <Route component={NoMatch} />
            </Switch>
          {/* </StoreProvider> */}
        </div>
      </Router>
    </ApolloProvider>
>>>>>>> 7d3b9dac1db48f7f490788aca4dc2da5810b79a4
  );
}

export default App;
