import React, { Component } from 'react'
import './style.scss'
import Info from './Info';

export default class Movie extends Component {
    constructor(props) {
        super(props);

        this.state = {movie: {}}
        this.getMovieInfo();
    }

    getMovieInfo() {
        fetch('https://ikhoudvanfilms.com/api/movies/byId?id=' + this.props.match.params.id)
        .then((res) => res.json())
        .then((res) => {
            fetch('https://www.omdbapi.com/?apikey=190fc593&i=' + res.imdbID)
            .then((secondRes) => secondRes.json())
            .then((secondRes) => {
                this.setState({movie: secondRes});
            });
        });
    }

    render() {
        return (
            <div className="movie-page">
                <img src={this.state.movie.Poster} alt="Movie Poster"></img>
                <div className="movie-info">
                    <div className="title">{this.state.movie.Title}</div>
                    <div className="extra-info">
                        <Info subject="Length">{this.state.movie.Runtime}</Info>
                        <Info subject="Genre">{this.state.movie.Genre}</Info>
                        <Info subject="Director">{this.state.movie.Director}</Info>
                        <Info subject="Writer">{this.state.movie.Writer}</Info>
                        <Info subject="Actors">{this.state.movie.Actors}</Info>
                        <Info subject="Producer">{this.state.movie.Production}</Info>
                    </div>
                    <div className="summary">{this.state.movie.Plot}</div>
                </div>
            </div>
        )
    }
}
