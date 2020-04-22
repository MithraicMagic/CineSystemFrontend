import React from 'react';
import Header from './Components/Header/Header';
import './style.scss'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './Pages/Home/Home';
import Users from './Pages/Users/Users';
import About from './Pages/About/About';
import Movie from './Pages/Movie/Movie';

export default function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path={'/'} component={Home}/>
        <Route path={'/about'} component={About}/>
        <Route path={'/users'} component={Users}/>
        <Route path={'/movie/:id'} component={Movie}/>
      </Switch>
    </Router>
  )
}

