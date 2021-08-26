import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Auth from './hoc/auth';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import NavBar from "./components/views/NavBar/NavBar";
import MovieDetail from './components/views/MovieDetail/MovieDetail';
import FavoritePage from './components/views/FavoritePage/FavoritePage';

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/" component={ Auth(LandingPage, null) } />
          <Route exact path="/login" component={ Auth(LoginPage, false) } />
          <Route exact path="/register" component={ Auth(RegisterPage, false) } />
          <Route exact path="/movie/:movieId" component={ Auth(MovieDetail, null) } />
          <Route exact path="/favorite" component={ Auth(FavoritePage, true) } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
