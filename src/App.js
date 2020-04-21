import React from 'react';
import Movie from './Movie';
import Header from './Header/Header';
import UsersPage from './Users/Main';
import './style.scss'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

export default function BasicExample() {
    return (
      <Router>
        <div>
          <Header />
          
          <Switch>
            <Route exact path="/"><Home/></Route> 
            <Route path="/about"><About/></Route> 
            <Route path="/users"><Users/></Route> 
          </Switch>
        </div>
      </Router>
    )}

    function Home() {
      return (
        <div className="App">
          <Movie/>
        </div>
      )
    }

    function About() {
      return (
        <div className="App">
          <Movie/>
        </div>
      )
    }

    function Users() {
      return (
        <div className="App">
          <UsersPage/>
        </div>
      )
    }

