import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = { loaded: false }

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

    showImage() {
        this.setState({loaded: true})
    }

    render() {
        if (!this.state.movie) {
            return (
                <div key={Math.random} className="movie">
                    <Link to={'/movie/'}>
                        <div className="poster"></div>
                    </Link>
                    <div className="movie-info">
                        <div className="movie-title">Loading...</div>
                        <div className="movie-rating">Loading...</div>
                    </div>
                </div>
            );
        };
        
        return (
            <div key={this.state.movie.title} className="movie">
                <Link to={'/movie/' + this.state.movie.dbId}>
                    <img style={this.state.loaded ? null : {display: "none"}} onLoad={() => this.showImage()} className="poster" src={this.state.movie.poster} alt="Movie Poster" />
                    <div style={this.state.loaded ? { display: "none" } : null} className="poster"></div>
                </Link>
                <div className="movie-info">
                    <div className="movie-title">{this.state.movie.title}</div>
                    <div className="movie-rating">{this.state.movie.yearOfRelease}</div>
                </div>
            </div>
        )
    }
}
