import React from 'react';
import Logo from './../../images/logo.svg'
import './style.scss';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    render() {
        return (
            <nav className="header">
                <div>
                    <Link to={'/'}><img className="logo" src={Logo} alt="logo"></img></Link>
                </div>
                <div>
                    <Link to={'/about'} className="button">About</Link>
                    <Link to={'/users'} className="button">Users</Link>
                </div>
            </nav>
        )
    }
}