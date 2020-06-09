import React, { Component } from 'react'
import Auth from '../../auth';
import './style.scss';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {userInfo: null, reservations: [], availableIcons: null};

        this.changeIcon = this.changeIcon.bind(this);

        this.checkLoggedIn();
        this.getUserInfo();
        this.getAvailableIcons();
    }

    checkLoggedIn() {
        if (!Auth.isTokenPresent()) {
            this.props.history.push('/login');
        }
    }

    getUserInfo() {
        fetch('https://ikhoudvanfilms.com/api/users/profile', {
            headers: {
                'Authorization': sessionStorage.getItem('jwtoken')
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {

                    const reservations = [];

                    res.message.reservations.forEach(r => {
                        const screening = reservations.find(reser => reser.id === r.screening.id);

                        if (screening) {
                            screening.count += 1;
                        } else {
                            r.screening.count = 1;
                            reservations.push(r.screening);
                        }
                    });

                    this.setState({
                        userInfo: res.message.user, 
                        reservations: reservations
                    });
                }
            });
    }

    getAvailableIcons() {
        fetch('https://ikhoudvanfilms.com/api/users/allIcons', {
            headers: {
                'Authorization': sessionStorage.getItem('jwtoken')
            }
        })
            .then(res => res.json())
            .then(res => {
                this.setState({availableIcons: res})
            });
    }

    showIcons() {
        if (this.state.availableIcons != null) {
            let icons = [];

            this.state.availableIcons.forEach((icon, i) => {
                icons.push(<img className="available-icon" src={'https://img.ikhoudvanfilms.com/' + icon.source} alt="user-icon" key={i} onClick={this.setSelected}></img>)
            });

            return icons;
        }
    }

    setSelected(e) {
        e.target.classList.toggle('selected');

        let elements = document.getElementsByClassName('available-icon');
        for (const item of elements) {
            if (item === e.target) continue;
            item.classList.remove('selected');
        }
    }

    toggleOverlay() {
        document.getElementById("overlay").classList.toggle('hidden');
    }

    changeIcon() {
        let chosenIcon = document.getElementsByClassName('selected')[0];
        this.toggleOverlay();

        if (!chosenIcon) {
            return;
        }

        fetch('https://ikhoudvanfilms.com/api/users/changeIcon', {
            headers: {
                'Authorization': sessionStorage.getItem('jwtoken'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                "source": chosenIcon.src.replace('https://img.ikhoudvanfilms.com/', '')
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                this.getUserInfo();
            } else {
                this.setError(res.message);
            }
        })
        .catch(e => {
            this.setError(e);
        })
    }

    setError(error) {
        this.setState({error: error})
    }

    renderUserInformation() {
        if (this.state.userInfo) {
            return (
                <div className="user-info">
                    {this.state.error ? this.state.error : null}
                    <img src={'https://img.ikhoudvanfilms.com/' + this.state.userInfo.icon.source} onClick={this.toggleOverlay} alt="user-icon"></img>
                    <div className="username">{this.state.userInfo.username}</div>
                    <div className="email">{this.state.userInfo.mail}</div>
                </div>
            );
        }
    }

    renderReservations() {
        if (this.state.reservations) {
            const reservations = [];

            this.state.reservations.forEach(reservation => {
                reservations.push(
                    <div className="reservation">
                        <div className="title">{reservation.movie.title}</div>
                        <div className="chairs">You have ordered {reservation.count} seats for this movie</div>
                    </div>
                );
            });

            return (
                <div className="reservations">
                    <div className="title">Reservations</div>
                    {reservations}
                </div>
            )
        }
    }

    render() {
        return (
            <div className="profile-page">
                <div className="profile">
                    {this.renderUserInformation()}
                    {this.renderReservations()}
                </div>

                <div className="overlay hidden" id="overlay">
                    <div className="overlay-content">
                        {this.showIcons()}
                    </div>
                    <button className="submit-button" onClick={this.changeIcon}>Submit</button>
                </div>       
            </div>
        )
    }
}
