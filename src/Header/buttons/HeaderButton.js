import React from 'react';
import styles from './style.module.scss'

class HeaderButton extends React.Component {
    render() {
        return (
            <a className={styles.button} href={this.props.href}>{this.props.children}</a>
        )
    }
}

export default HeaderButton;