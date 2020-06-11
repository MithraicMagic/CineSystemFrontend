import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import './style.scss';
import { Link } from 'react-router-dom';
import BackButton from '../../Components/BackButton/BackButton';

export default class QrPage extends Component {
    constructor(props) {
        super(props);

        this.state = {screening: null};
    }

    componentDidMount() {
        fetch('https://ikhoudvanfilms.com/api/screenings/' + this.props.match.params.id)
            .then(res => res.json())
            .then(res => {
                res.date = new Date(res.date);
                this.setState({screening: res});
            });
    }

    render() {
        return (
            <div className="qr-page">
                <BackButton onClick={() => this.props.history.goBack()}></BackButton>
                <div className="screening-info">
                    <div className="title">{this.state.screening ? this.state.screening.movie.title : 'Loading...'}</div>
                    <div className="time">
                        {this.state.screening ? 
                            this.state.screening.date.getDate() + '-' + (this.state.screening.date.getMonth() + 1) + ' ' + this.state.screening.date.getHours() + ':' + this.state.screening.date.getMinutes() 
                            : '-'}
                        </div>
                    <div className="location">{this.state.screening ? this.state.screening.theater.cinema.name : '-'}</div>
                </div>
                <QRCode bgColor="#001e36" fgColor="#f2d03b" value={"http://ikhoudvanfilms.com/movie/" + (this.state.screening ? this.state.screening.movie.id : 0)} size={256}></QRCode>
                <Link to={'/movie/' + (this.state.screening ? this.state.screening.movie.id : 0)}>Movie Info</Link>
            </div>
        );
    }
}
