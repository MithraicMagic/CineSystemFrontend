import React, { Component } from 'react'
import Auth from '../../auth';
import './style.scss';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {userInfo: null, availableIcons: null};

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
                    this.setState({userInfo: res.message})
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

    getIcons() {
        if (this.state.availableIcons != null) {
            let icons = [];

            this.state.availableIcons.forEach((icon, i) => {
                icons.push(<img className="available-icon" src={icon.source} alt="user-icon" key={i} onClick={this.setSelected}></img>)
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

        const userInfo = this.state.userInfo;
        userInfo.icon.source = chosenIcon.src;

        this.setState({userInfo: userInfo})

        this.toggleOverlay();
    }

    renderUserInformation() {
        if (this.state.userInfo != null) {
            return (
                <div className="profile">
                    <img src={this.state.userInfo.icon.source} onClick={this.toggleOverlay} alt="user-icon"></img>
                    <p>{this.state.userInfo.username}</p>
                    <p>{this.state.userInfo.mail}</p>
                    <p>{this.state.userInfo.pointsAmount}</p>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="profile-page">
                {this.renderUserInformation()} 

                <div className="overlay hidden" id="overlay">
                    <div className="overlay-content">
                        {this.getIcons()}
                    </div>
                    <button className="submit-button" onClick={this.changeIcon}>Submit</button>
                </div>       
            </div>
        )
    }
}
