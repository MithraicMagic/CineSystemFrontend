import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = { movie: null }

        this.getInfo();
    }

    getInfo() {
        fetch('https://www.omdbapi.com/?apikey=190fc593&i=' + this.props.imdbId)
            .then((res) => res.json())
            .then((res) => {
                let movie = { dbId: this.props.dbId, title: res.Title, yearOfRelease: res.Year, poster: res.Poster };
                this.setState({movie});
            });
    }

    render() {
        if (!this.state.movie) return null;
        return (
            <div key={this.state.movie.title} className="movie">
                <Link to={'/movie/' + this.state.movie.dbId}><img className="poster" src={this.state.movie.poster} alt="Movie Poster" /></Link>
                <div className="movie-info">
                    <div className="movie-title">{this.state.movie.title}</div>
                    <div className="movie-rating">{this.state.movie.yearOfRelease}</div>
                </div>
            </div>
        )
    }
}
