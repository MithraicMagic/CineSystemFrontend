import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dbMovies: [], movies: []};
    }

    componentDidMount() {
        this.getMovies();
    }

    async getMovies() {
        await this.getMoviesFromDb();
        this.getInfo();
    }

    async getMoviesFromDb() {
        await fetch('https://ikhoudvanfilms.com/api/movies/all')
        .then((res) => res.json())
        .then((res) => {
            res.forEach(movie => {
                this.setState({dbMovies: [...this.state.dbMovies, movie]})
            })
        });
    }
    
    getInfo() {
        this.state.dbMovies.forEach(m => {
            fetch('http://www.omdbapi.com/?apikey=190fc593&i=' + m.imdbID)
            .then((res) => res.json())
            .then((res) => {
                let movie = {dbId: m.id, title: res.Title, yearOfRelease: res.Year, poster: res.Poster};
                let newMovies = [...this.state.movies, movie];
                this.setState({movies: newMovies});
            });
        })
    }

    showMovies() {
        let elements = [];
        this.state.movies.forEach(movie => {
            elements.push(
                <div key={movie.title} className="movie">
                    <Link to={'/movie/' + movie.dbId}><img src={movie.poster} alt="Movie Poster"/></Link>
                    <div className="movie-info">
                        <div className="movie-title">{movie.title}</div>
                        <div className="movie-rating">{movie.yearOfRelease}</div>
                    </div>
                </div>
            )
        });
        return elements;
    }

    render() {
        return (
            <div className="home">
                <div className="movie-container">
                    {this.showMovies()}
                </div>
            </div>
        )
    }
}

export default Home;