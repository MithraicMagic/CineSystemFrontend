import React from 'react';
import Logo from './../../images/logo.svg'
import './style.scss';
import { Link } from 'react-router-dom';
import Auth from '../../auth';

export default class Header extends React.Component {
    getAccountButton() {
        if (Auth.isTokenPresent()) {
            sessionStorage.setItem('username', 'Nick Walraven');
            return (
                <div className="dropdown">
                    <span><div key={0}>{sessionStorage.getItem('username')}</div></span>
                    <div className="dropdown-content">
                        <Link to={'/profile'} className="button" key={1}>Profile</Link>
                        <Link to={'/logout'} className="button" key={2}>Logout</Link>
                    </div>
                </div>
            )
        }

        return <Link to={'/login'} className="button">Login</Link>
    }

    render() {
        return (
            <nav className="header">
                <div>
                    <Link to={'/'}><img className="logo" src={Logo} alt="logo"></img></Link>
                </div>
                <div>
                    {/* <Link to={'/about'} className="button">About</Link> */}
                    {this.getAccountButton()}
                </div>
            </nav>
        )
    }
}