import React, { Component } from 'react'
import './style.scss'

export default class Logout extends Component {
    componentDidMount() {
        sessionStorage.clear();
        window.location.replace('/');
    }

    render() {
        return (
            <div className="logout-page">
                <h1>Logging out...</h1>
            </div>
        )
    }
}
