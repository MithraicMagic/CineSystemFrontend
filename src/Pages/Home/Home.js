import React from 'react';
import './style.scss';
import Information from './Information';
import Movie from '../../Components/Movie/Movie';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbMovies: [],
            movies: [],
            amountShownMovies: Math.ceil(1 + (Math.max((window.innerWidth - 800), 0) / 400)),
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
        this.setState({ amountShownMovies: Math.ceil(1 + (Math.max((window.innerWidth - 800), 0) / 400)), moviePage: 0});
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
        this.createMovies();
    }

    async getMoviesFromDb() {
        await fetch('https://ikhoudvanfilms.com/api/movies/all')
            .then((res) => res.json())
            .then((res) => {
                res.forEach(movie => {
                    this.setState({dbMovies: [...this.state.dbMovies, movie]})
                });
            });
    }

    createMovies() {
        const movies = [];

        this.state.dbMovies.sort((a, b) => a.title.localeCompare(b.title));

        this.state.dbMovies.forEach((m, i) => {
            movies.push(<Movie key={i} imdbId={m.imdbID} dbId={m.id}/>)
        });

        this.setState({movies});
    }

    showMovies() {
        const elements = [];

        for (let i = 0; i < this.state.amountShownMovies && i < this.state.movies.length; i++) {
            const movie = this.state.movies[i + (this.state.amountShownMovies * this.state.moviePage)];
            if (!movie) break;
            elements.push(movie);
        }

        return elements;
    }

    render() {
        return (
            <div className="home">
                <h1 className="header-text">Now in Theaters</h1>
                <div className="movie-container">
                    <div className="arrow-container" onClick={() => this.updateMoviePage(-1)}>
                        <div className="arrow left"></div>
                    </div>
                    {this.showMovies()}
                    <div className="arrow-container" onClick={() => this.updateMoviePage(1)}>
                        <div className="arrow right"></div>
                    </div>
                </div>

                <Information src="https://img.ikhoudvanfilms.com/icons/movie.svg" alt="Movie">
                    The best trending movies, all playing in one cinema
                </Information>
                <Information src="https://img.ikhoudvanfilms.com/icons/theater.svg" alt="Theater" reverse={true}>
                    Great quality screens, showing the movies in all of their glory
                </Information>
                <Information src="https://img.ikhoudvanfilms.com/icons/ticket.svg" alt="Movie">
                    Get your tickets with our easy reservation system
                </Information>
            </div>
        )
    }
}

export default Home;