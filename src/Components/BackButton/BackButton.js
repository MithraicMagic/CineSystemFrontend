import React, { Component } from 'react';
import './style.scss';

export default class BackButton extends Component {
    render() {
        return (
            <div className="back-button" onClick={this.props.onClick}>
                Go Back
            </div>
        )
    }
}
