import React from 'react';
import Header from './Components/Header/Header';
import './style.scss'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Movie from './Pages/Movie/Movie';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Profile from './Pages/Profile/Profile';
import Logout from './Pages/Logout/Logout';
import NoMatch from './Pages/NoMatch/NoMatch';
import Screening from './Pages/Screening/Screening';

export default function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path={'/'} component={Home}/>
        <Route path={'/about'} component={About}/>
        <Route path={'/login'} component={Login}/>
        <Route path={'/register'} component={Register}/>
        <Route path={'/profile'} component={Profile}/>
        <Route path={'/movie/:id'} component={Movie}/>
        <Route path={'/screening/:id'} component={Screening}/>
        <Route path={'/logout'} component={Logout}/>
        <Route path={'/*'} component={NoMatch}/>
      </Switch>
    </Router>
  )
}
