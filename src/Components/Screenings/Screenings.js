import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './style.scss';

const DAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default class Screenings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movieId: this.props.movieId,
            cinemas: []
        }
    }

    componentDidMount() {
        fetch('https://ikhoudvanfilms.com/api/screenings/movie/' + this.state.movieId)
            .then(res => res.json())
            .then(res => {
                const cinemas = [];

                res.message.forEach(screening => {
                    const screeningDate = new Date(screening.date);

                    let cinema = cinemas.find(cinema => cinema.id === screening.theater.cinema.id);
                    if (cinema === undefined) {
                        cinema = {
                            id: screening.theater.cinema.id,
                            name: screening.theater.cinema.name,
                            dates: []
                        }

                        cinemas.push(cinema);
                    }

                    let date = cinema.dates.find(date => date.day === screeningDate.getDate() && date.month === screeningDate.getMonth() && date.year === screeningDate.getFullYear());
                    if (date === undefined) {
                        date = {
                            year: screeningDate.getFullYear(),
                            month: screeningDate.getMonth(),
                            day: screeningDate.getDate(),
                            fullDate: screeningDate,
                            screenings: []
                        }

                        cinema.dates.push(date);
                    }

                    date.screenings.push({
                        id: screening.id,
                        time: screeningDate,
                        type: screening.movieType
                    });
                });

                cinemas.forEach(cinema => {
                    cinema.dates.sort((one, two) => {
                        const valOne = one.year * 100 + one.month * 10 + one.day;
                        const valTwo = two.year * 100 + two.month * 10 + two.day;
                        return valOne - valTwo;
                    });

                    cinema.dates.forEach(date => {
                        date.screenings.sort((one, two) => one.time.getTime() - two.time.getTime());
                    });
                });

                this.setState({cinemas: cinemas});
            });
    }

    showScreenings() {
        const cinemas = [];

        this.state.cinemas.forEach(cinema => {
            const dates = [];

            cinema.dates.forEach((date, i) => {
                const timeslots = [];
                
                date.screenings.forEach(screening => {
                    timeslots.push(
                        <Link key={screening.id} to={'/screening/' + screening.id}>{screening.time.getHours()}:{screening.time.getMinutes()} {screening.type}</Link>
                    )
                });

                dates.push(
                    <div className="date" key={i}>
                        <div className="day">{DAY[date.fullDate.getDay()]}</div>
                        <div className="timeslots">{timeslots}</div>
                    </div>
                );
            });

            cinemas.push(
                <div className="cinema" key={cinema.id}>
                    <div className="cinema-name">{cinema.name}</div>
                    <div className="dates">{dates}</div>
                </div>
            );
        });

        return cinemas
    }
    
    render() {
        return (
            <div className="screening-overview">
                <span className="overview-header">Screenings</span>
                {this.showScreenings()}
            </div>
        )
    }
}
