import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export default class NoMatch extends Component {
    render() {
        return (
            <div className="no-match">
                <span className="emoji" role="img" aria-label="A crying cat!">😿</span>
                <h1>Page not found...</h1>
                <span>There's absolutely nothing here!</span>
                <Link to={'/'}>Go Home</Link>

                <span className="secret">Gah, you got me, there was something to find here! You have just earned one million cool-points for checking out the code!</span>
            </div>
        );
    }
}