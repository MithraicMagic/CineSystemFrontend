import React from 'react';
import './style.scss'

class HeaderButton extends React.Component {
    render() {
        return (
            <a href={this.props.href}>{this.props.children}</a>
        )
    }
}

export default HeaderButton;