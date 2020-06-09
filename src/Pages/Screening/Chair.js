import React, { Component } from 'react'

export default class Chair extends Component {
    render() {
        return (
            <div onClick={this.props.onClick} id={this.props.id} className={this.props.reserved ? "chair reserved" : "chair"}>
                {this.props.number}
            </div>
        )
    }
}
