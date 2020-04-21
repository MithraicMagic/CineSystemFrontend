import React from 'react';
import HeaderButton from './buttons/HeaderButton';
import Logo from './../images/logo.svg'
import styles from './buttons/style.module.scss';

export default class Header extends React.Component {
    render() {
        return (
            <div className={styles.header}>
                <div>
                    <a href="/"><img className={styles.logo} src={Logo} alt="logo"></img></a>
                </div>
                <div>
                    <HeaderButton href="/about">About</HeaderButton>
                    <HeaderButton href="/users">Users</HeaderButton>
                </div>
            </div>
        )
    }
}