import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbMovies: [],
            movies: [],
            amountShownMovies: Math.ceil(1 + ((window.innerWidth - 800) / 400)),
            moviePage: 0};

        this.updateWidth = this.updateWidth.bind(this);
        this.updateMoviePage = this.updateMoviePage.bind(this);
    }

    componentDidMount() {
        this.getMovies();
        window.addEventListener('resize', this.updateWidth);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidth);
    }

    updateWidth() {
        this.setState({amountShownMovies: Math.ceil(1 + ((window.innerWidth - 800) / 400)), moviePage: 0});
    }

    updateMoviePage(val) {
        const maxPage = Math.ceil(this.state.dbMovies.length / this.state.amountShownMovies - 1);
        let page = this.state.moviePage + val;

        if (page < 0) {
            page = 0;
        } else if (page > maxPage) {
            page = maxPage;
        }

        this.setState({moviePage: page});
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
            fetch('https://www.omdbapi.com/?apikey=190fc593&i=' + m.imdbID)
            .then((res) => res.json())
            .then((res) => {
                let movie = {dbId: m.id, title: res.Title, yearOfRelease: res.Year, poster: res.Poster};
                let newMovies = [...this.state.movies, movie];
                this.setState({movies: newMovies});
            });
        })
    }

    showMovies() {
        this.state.movies.sort((a, b) => a.title.localeCompare(b.title));

        let elements = [];
        for (let i = 0; i < this.state.amountShownMovies && i < this.state.movies.length; i++) {
            const movie = this.state.movies[i + (this.state.amountShownMovies * this.state.moviePage)];
            if (movie === undefined) break;
            elements.push(
                <div key={movie.title} className="movie">
                    <Link to={'/movie/' + movie.dbId}><img src={movie.poster} alt="Movie Poster" /></Link>
                    <div className="movie-info">
                        <div className="movie-title">{movie.title}</div>
                        <div className="movie-rating">{movie.yearOfRelease}</div>
                    </div>
                </div>
            )
        }
        return elements;
    }

    render() {
        return (
            <div className="home">
                <h1 className="header-text">Featured Movies</h1>
                <div className="movie-container">
                    <div className="arrow-container" onClick={() => this.updateMoviePage(-1)}>
                        <div className="arrow left"></div>
                    </div>
                    {this.showMovies()}
                    <div className="arrow-container" onClick={() => this.updateMoviePage(1)}>
                        <div className="arrow right"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;