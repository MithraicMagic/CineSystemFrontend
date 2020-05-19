import React, { Component } from 'react'

export default class Information extends Component {
    render() {
        return (
            <div className={this.props.reverse ? "information reverse" : "information"}>
                <img src={this.props.src} alt={this.props.alt}/>
                <span>
                    {this.props.children}
                </span>
            </div>
        )
    }
}
