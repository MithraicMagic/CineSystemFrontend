import React from 'react';
import HeaderButton from './buttons/HeaderButton';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <HeaderButton href="index.css">Styling</HeaderButton>
                <HeaderButton href = "http://google.nl">freek</HeaderButton>
            </div>
        )
    }
}

export default Header;