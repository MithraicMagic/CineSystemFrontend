import React, { Component } from 'react'
import Auth from '../../auth';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {userInfo: null};

        this.checkLoggedIn();
        this.getUserInfo();
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
        })
    }

    renderUserInformation() {
        if (this.state.userInfo != null) {
            return (
            <div>
                <p>{this.state.userInfo.username}</p>
                <p>{this.state.userInfo.mail}</p>
                <p>{this.state.userInfo.pointsAmount}</p>
            </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderUserInformation()}        
            </div>
        )
    }
}
