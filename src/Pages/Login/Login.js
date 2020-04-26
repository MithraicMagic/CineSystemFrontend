import React, { Component } from 'react'
import './style.scss'
import Auth from '../../auth'

export default class Login extends Component {

    componentDidMount() {
        if (Auth.isTokenPresent()) {
            this.props.history.push('/profile')
        }
    }

    login(e) {
        e.preventDefault();
        let button = document.getElementById("login-button");
        button.innerText = "Logging in";
        button.disabled = true;

        let username = document.getElementById("username-input").value;
        let password = document.getElementById("password-input").value;

        fetch("https://ikhoudvanfilms.com/api/login",
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        })
        .then(res => {
            let token = res.headers.get('Authorization');
            if (token != null) {
                sessionStorage.setItem("jwtoken", token);
                sessionStorage.setItem("username", username);
                window.location.replace('/');
            } else {
                this.loginFailed();
            }
        })
    }

    loginFailed() {
        document.getElementById('error-message').innerText = "Login failed";
        document.getElementById("login-button").innerText = "Login";
        document.getElementById("login-button").disabled = false;
    }

    render() {
        return (
            <div className="login-page">
                <form autoComplete="off">
                    <span id="error-message"></span>
                    <input id="username-input" placeholder="Username" type="text"></input>
                    <input id="password-input" placeholder="Password" type="password"></input>
                    <button id="login-button" onClick={e => this.login(e)}>Login</button>
                    <hr/>
                    <button id="signup-button" onClick={e => {e.preventDefault(); this.props.history.push('/register');}}>Sign Up</button>
                </form>
            </div>
        )
    }
}
