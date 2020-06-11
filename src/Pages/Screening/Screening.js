import React, { Component } from 'react'
import Chair from './Chair';
import Auth from './../../auth';
import './style.scss';
import { Link } from 'react-router-dom';
import BackButton from '../../Components/BackButton/BackButton';

export default class Screening extends Component {
    constructor(props) {
        super(props);

        this.state = {
            screening: null,
            chairs: [],
            chosenChairs: []
        }
    }

    async componentDidMount() {
        let screening = {};
        let chairs = [];

        await fetch('https://ikhoudvanfilms.com/api/chairs/get/' + this.props.match.params.id)
            .then(res => res.json())
            .then(res => {
                screening = res.message.screening;
                chairs = res.message.chairs;
            });

        await fetch('https://ikhoudvanfilms.com/api/screenings/getReservations/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(screening)
        })
            .then(res => res.json())
            .then(res => {
                chairs.forEach(chair => {
                    chair.reserved = res.message.findIndex(reservation => reservation.chair.id === chair.id) !== -1;
                });
            });

        chairs.sort((one, two) => one.id - two.id);
        screening.date = new Date(screening.date);

        this.setState({screening, chairs});

        if (Auth.isTokenPresent()) {
            document.getElementById('confirm-button').addEventListener('click', () => this.confirmReservation());
        } else {
            document.getElementById('overlay').style.display = 'flex';
        }
    }

    confirmReservation() {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('reservation-confirmation').style.display = 'flex';
        document.getElementById('overlay').style.display = 'flex';

        const reservations = [];

        this.state.chosenChairs.forEach(id => {
            reservations.push({
                chair: {
                    id: id
                },
                screening: {
                    id: this.state.screening.id
                }
            });
        });

        fetch('https://ikhoudvanfilms.com/api/screenings/addReservation', {
            method: 'POST',
            headers: {
                'Authorization': sessionStorage.getItem('jwtoken'),
                'content-type': 'application/json'
            }, 
            body: JSON.stringify({
                reservations: reservations
            })
        })
            .then(res => res.json())
            .then(res => {
                document.getElementById('message').innerText = res.message;

                if (res.success) {
                    document.getElementById('success').style.display = 'block'
                } else {
                    document.getElementById('fail').style.display = 'block'
                }
            });
    }

    showChairs() {
        const chairs = [];

        this.state.chairs.forEach((chair, i) => {
            chairs.push(<Chair onClick={() => this.handleChairClick(chair.id)} className="chair" reserved={chair.reserved} id={chair.id} key={i} number={i+1}></Chair>);
        });

        return chairs;
    }

    handleChairClick(i) {
        const element = document.getElementById(i);

        if (element.classList.contains('reserved')) {
            return;
        }

        element.classList.toggle('chosen');

        const index = this.state.chosenChairs.findIndex(c => c === i);
        const chairs = this.state.chosenChairs;

        if (index === -1) {
            chairs.push(i);
            this.setState({chosenChairs: chairs});
        } else {
            chairs.splice(index, 1);
            this.setState({chosenChairs: chairs});
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
                headers: { 'Content-Type': 'application/json' },
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
                    window.location.reload();
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
            <div className="screening-page">
                <BackButton onClick={() => this.props.history.goBack()}></BackButton>
                <div className="screening">
                    <div className="top">
                        <h1 className="title">{this.state.screening ? this.state.screening.movie.title : "Loading..."}</h1>
                        <h2 className="time-loc">{this.state.screening ? this.state.screening.date.getHours() + ":" + this.state.screening.date.getMinutes() + " - " + this.state.screening.theater.cinema.name + " - Theater " + this.state.screening.theater.number : "Loading..."}</h2>
                    </div>
                    <div className="theater-view">
                        <div className="screen"></div>
                        <div className="spacer"></div>
                        <div className="chairs">{this.showChairs()}</div>
                        <div className="spacer"></div>
                    </div>
                    <div className="confirmation-container">
                        <span className="info">You have selected {this.state.chosenChairs.length} {this.state.chosenChairs.length === 1 ? "chair" : "chairs"}</span>
                        <button id="confirm-button">Confirm Reservation</button>
                    </div>
                    <div id="overlay">
                        <form id="login-form" autoComplete="off">
                            <span id="error-message"></span>
                            <input id="username-input" placeholder="Username" type="text"></input>
                            <input id="password-input" placeholder="Password" type="password"></input>
                            <button id="login-button" onClick={e => this.login(e)}>Login</button>
                            <hr />
                            <button id="signup-button" onClick={e => { e.preventDefault(); this.props.history.push('/register'); }}>Sign Up</button>
                        </form>
                        <div id="reservation-confirmation" className="confirmation">
                            <span id="message">Loading...</span>
                            <Link id="success" className="btn disabled" to="/profile">Okay!</Link>
                            <button id="fail" className="btn disabled" onClick={() => window.location.reload()}>Okay!</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
