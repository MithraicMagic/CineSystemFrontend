import React, { Component } from 'react'
import './../Login/style.scss'
import Auth from '../../auth'

export default class Register extends Component {

    componentDidMount() {
        if (Auth.isTokenPresent()) {
            this.props.history.push('/profile')
        }
    }

    checkFields(e) {
        e.preventDefault();
        let button = document.getElementById("register-button");
        button.innerText = "Registering";
        button.disabled = true;

        let validInputs = true;
        let username = document.getElementById("username-input");
        let password = document.getElementById("password-input");
        let passwordConfirmation = document.getElementById("password-confirmation-input");
        let mail = document.getElementById("mail-input");

        [username, password, passwordConfirmation, mail].forEach(e => e.classList.remove("error"));
        [username, password, mail].forEach(e => {
            if (e.value === "") {
                validInputs = false;
                e.classList.add("error");
            }
        })

        if (passwordConfirmation.value === "" || password.value !== passwordConfirmation.value) {
            validInputs = false;
            passwordConfirmation.classList.add("error");
        }

        if (validInputs) {
            this.register(username.value, password.value, mail.value);
        } else {
            this.registerFailed({message: "Check all input fields"});
        }
    }

    register(username, password, mail) {
        fetch("https://ikhoudvanfilms.com/api/users/register",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                    "mail": mail
                })
            }
        )
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                this.props.history.push('/login');
            } else {
                this.registerFailed(res);
            }
        })
    }

    registerFailed(res) {
        document.getElementById('error-message').innerText = "Register failed";
        document.getElementById('error-message').title = res.message;
        document.getElementById("register-button").innerText = "Register";
        document.getElementById("register-button").disabled = false;
    }

    render() {
        return (
            <div className="login-page">
                <form autoComplete="off">
                    <span id="error-message"></span>
                    <input id="username-input" placeholder="Username" type="text"></input>
                    <input id="mail-input" placeholder="E-Mail Address" type="text"></input>
                    <input id="password-input" placeholder="Password" type="password"></input>
                    <input id="password-confirmation-input" placeholder="Confirm Password" type="password"></input>
                    <button id="register-button" onClick={e => this.checkFields(e)}>Register</button>
                </form>
            </div>
        )
    }
}

