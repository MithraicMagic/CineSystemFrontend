import React from 'react';
import Header from './Components/Header/Header';
import './style.scss'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './Pages/Home/Home';
import Movie from './Pages/Movie/Movie';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Profile from './Pages/Profile/Profile';
import Logout from './Pages/Logout/Logout';
import NoMatch from './Pages/NoMatch/NoMatch';
import Screening from './Pages/Screening/Screening';
import QrPage from './Pages/QrPage/QrPage';

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={'/'} component={Home}/>
        <Route exact path={'/login'} component={Login}/>
        <Route exact path={'/register'} component={Register}/>
        <Route exact path={'/profile'} component={Profile}/>
        <Route exact path={'/profile/myQr/:id'} component={QrPage}/>
        <Route exact path={'/movie/:id'} component={Movie}/>
        <Route exact path={'/screening/:id'} component={Screening}/>
        <Route exact path={'/logout'} component={Logout}/>
        <Route path={'/*'} component={NoMatch}/>
      </Switch>
    </Router>
  )
}
