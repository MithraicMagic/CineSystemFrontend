import React from 'react';
import Logo from './../../images/logo.svg'
import './style.scss';
import { Link } from 'react-router-dom';
import Auth from '../../auth';

export default class Header extends React.Component {
    getAccountButton() {
        if (Auth.isTokenPresent()) {
            let firstBtn = <Link to={'/profile'} className="button">{sessionStorage.getItem('username')}</Link>
            let secondBtn = <Link to={'/logout'} className="button">Logout</Link>
            return [firstBtn, secondBtn];
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