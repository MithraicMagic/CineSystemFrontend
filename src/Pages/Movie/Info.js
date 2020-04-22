import React, { Component } from 'react'

export default class Info extends Component {
    render() {
        return (
            <div>
                <span className="subject">{this.props.subject}: </span>{this.props.children} 
            </div>
        )
    }
}
