import React, { Component } from 'react'
import Auth from '../../auth';
import './style.scss';
import AdminFetches from './AdminFetches';

export default class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cinemas: [],
            theaters: [],
            screenings: [],
            movies: [],
            users: [],
            oldImdbId: 'hans'
        }

        this.checkAdmin();
        this.getObjects();

        this.fetchImdbInfo = this.fetchImdbInfo.bind(this);
    }

    checkAdmin() {
        if (!Auth.isAdmin()) {
            this.props.history.push('/goaway');
        }
    }

    async getObjects() {
        let objects = await AdminFetches.getObjects();

        objects.screenings.forEach(screening => screening.jsDate = new Date(screening.date));

        this.setState({
            cinemas: objects.cinemas,
            theaters: objects.theaters,
            screenings: objects.screenings,
            movies: objects.movies,
            users: objects.users
        });
    }

    componentDidMount() {
        const types = ['cinema', 'theater', 'screening', 'movie', 'user'];

        types.forEach(type => {
            document.getElementById(type).addEventListener('change', () => this.checkIfZero(type));
            document.getElementById(type + '-remove').addEventListener('click', (e) => {
                e.preventDefault();
                this.removeObject(type);
            });

            document.getElementById(type + '-submit').addEventListener('click', (e) => {
                e.preventDefault();
                this.additObject(type);
            });
        });

        document.getElementById('movie-imdb-id').addEventListener('focusout', this.fetchImdbInfo);
    }

    checkIfZero(type) {
        const id = parseInt(document.getElementById(type).value);

        if (id === 0) {
            document.getElementById(type + '-edit').reset();

            if (type === 'user') {
                document.getElementById(type + '-submit').disabled = true;
                document.getElementById(type + '-remove').disabled = true;
                document.getElementById('user-name').disabled = true;
                return;
            }
            
            document.getElementById(type + '-submit').innerText = 'Add';
            document.getElementById(type + '-remove').disabled = true;
            return;
        }

        document.getElementById(type + '-submit').innerText = 'Edit';
        document.getElementById(type + '-submit').disabled = false;
        document.getElementById(type + '-remove').disabled = false;

        switch (type) {
            case 'cinema': this.getCinemaInfo(id); break;
            case 'theater': this.getTheaterInfo(id); break;
            case 'screening': this.getScreeningInfo(id); break;
            case 'movie': this.getMovieInfo(id); break;
            case 'user': this.getUserInfo(id); break;
            default: break;
        }
    }

    getCinemaInfo(id) {
        const cinema = this.state.cinemas.find(c => c.id === id);

        document.getElementById('cinema-address').value = cinema.address;
        document.getElementById('cinema-name').value = cinema.name;
    }

    getTheaterInfo(id) {
        const theater = this.state.theaters.find(t => t.id === id);

        document.getElementById('theater-name').value = theater.name;
        document.getElementById('theater-cinema').value = theater.cinema.id;
    }

    getScreeningInfo(id) {
        const screening = this.state.screenings.find(s => s.id === id);

        document.getElementById('screening-date').value = screening.date;
        document.getElementById('screening-language').value = screening.language;
        document.getElementById('screening-type').value = screening.movieType;
        document.getElementById('screening-movie').value = screening.movie.id;
        document.getElementById('screening-theater').value = screening.theater.id;
    }

    getMovieInfo(id) {
        const movie = this.state.movies.find(m => m.id === id);

        document.getElementById('movie-title').value = movie.title;
        document.getElementById('movie-imdb-id').value = movie.imdbID;
    }

    getUserInfo(id) {
        const user = this.state.users.find(u => u.id === id);

        document.getElementById('user-name').value = user.username;
        document.getElementById('user-mail').value = user.mail;

        document.getElementById('user-name').disabled = false;
    }

    async fetchImdbInfo() {
        const newImdbId = document.getElementById('movie-imdb-id').value;

        if (this.state.oldImdbId === newImdbId) {
            return;
        }

        await fetch('https://www.omdbapi.com/?apikey=190fc593&i=' + newImdbId)
            .then(res => res.json())
            .then(res => {
                const outputField = document.getElementById('movie-title');

                if (!res.Title) {
                    outputField.value = "A movie with that IMDB ID could not be found";
                } else {
                    outputField.value = res.Title;
                }
            })

        this.setState({previousImdbId: newImdbId})
    }

    additObject(type) {
        const formData = new FormData(document.getElementById(type + '-edit'));
        
        const dataObject = {};
        switch (type) {
            case 'cinema':
                dataObject.address = formData.get('cinemaAddress');
                dataObject.name = formData.get('cinemaName');
                break;
            case 'theater':
                dataObject.name = formData.get('theaterName');
                dataObject.cinema = {
                    id: formData.get('theaterCinema')
                };
                break;
            case 'screening':
                dataObject.language = formData.get('screeningLanguage');
                dataObject.movieType = formData.get('screeningType');
                dataObject.date = formData.get('screeningDate');
                dataObject.movie = {
                    id: formData.get('screeningMovie')
                };
                dataObject.theater = {
                    id: formData.get('screeningTheater')
                }
                break;
            case 'movie':
                dataObject.imdbID = formData.get('movieImdbId');
                dataObject.title = document.getElementById('movie-title').value;
                break;
            case 'user':
                dataObject.username = formData.get('userName');
                dataObject.mail = document.getElementById('user-mail').value;
                break;
            default:
                break;
        }

        console.log(dataObject);

        const id = parseInt(document.getElementById(type).value);

        fetch('https://ikhoudvanfilms.com/api/' + type + 's/add/' + id, {
            method: 'PUT',
            headers: {
                'Authorization': sessionStorage.getItem('jwtoken'),
                'content-type': 'application/json'
            },
            body: JSON.stringify(dataObject)
        })
            .then(res => res.json())
            .then(res => {
                alert(res.message);
                if (res.success) {
                    window.location.reload();
                }
            });
    }

    removeObject(type) {
        const id = parseInt(document.getElementById(type).value);
        
        if (id === 0) {
            return;
        }

        if (window.confirm('Are you sure you want to delete this ' + type + '?')) {
            fetch('https://ikhoudvanfilms.com/api/' + type + 's/remove/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': sessionStorage.getItem('jwtoken')
                }
            })
            .then(res => res.json())
            .then(res => {
                alert(res.message);
                if (res.success) {
                    window.location.reload();
                }
            });
        }
    }

    renderObjects(isCinema) {
        const elements = [];
        const array = isCinema ? this.state.cinemas : this.state.theaters;

        array.forEach((object, i) => {
            elements.push(
                <option key={i} value={object.id}>{object.name}</option>
            );
        });

        return elements;
    }

    renderScreenings() {
        const elements = [];

        this.state.screenings.forEach((screening, i) => {
            elements.push(
                <option key={i} value={screening.id}>{screening.movie.title + ' - ' + screening.theater.name + ' - ' + screening.jsDate}</option>
            );
        });

        return elements;
    }

    renderMovies() {
        const elements = [];

        this.state.movies.forEach((movie, i) => {
            elements.push(
                <option key={i} value={movie.id}>{movie.title}</option>
            );
        });

        return elements;
    }

    renderUsers() {
        const elements = [];

        this.state.users.forEach((user, i) => {
            elements.push(
                <option key={i} value={user.id}>{user.username}</option>
            );
        });

        return elements;
    }

    render() {
        return (
            <div className="admin-page">
                <div className="panel">

                    {/* The form to edit cinemas */}
                    <form id="cinema-edit">
                        <div className="title">Cinemas</div>
                        <label htmlFor="cinema">Cinema</label>
                        <select id="cinema">
                            <option value="0">New Cinema</option>
                            {this.renderObjects(true)}
                        </select>
                        <label htmlFor="cinema-address">Address</label>
                        <input type="text" id="cinema-address" name="cinemaAddress"></input>
                        <label htmlFor="cinema-name">Name</label>
                        <input type="text" id="cinema-name" name="cinemaName"></input>
                        <div className="button-container">
                            <button id="cinema-submit" className="submit-button">Add</button>
                            <button id="cinema-remove" className="remove-button" disabled>Delete</button>
                        </div>
                    </form>

                    {/* The form to edit theaters */}
                    <form id="theater-edit">
                        <div className="title">Theaters</div>
                        <label htmlFor="theater">Theater</label>
                        <select id="theater">
                            <option value="0">New Theater</option>
                            {this.renderObjects(false)}
                        </select>
                        <label htmlFor="theater-name">Name</label>
                        <input type="text" id="theater-name" name="theaterName"></input>
                        <label htmlFor="theater-cinema">Cinema</label>
                        <select id="theater-cinema" name="theaterCinema">
                            {this.renderObjects(true)}
                        </select>
                        <div className="button-container">
                            <button id="theater-submit" className="submit-button">Add</button>
                            <button id="theater-remove" className="remove-button" disabled>Delete</button>
                        </div>
                    </form>

                    {/* The form to edit screenings */}
                    <form id="screening-edit">
                        <div className="title">Screenings</div>
                        <label htmlFor="screening">Screening</label>
                        <select id="screening">
                            <option value="0">New Screening</option>
                            {this.renderScreenings()}
                        </select>
                        <label htmlFor="screening-date">Date & Time</label>
                        <input type="datetime-local" id="screening-date" name="screeningDate"></input>
                        <label htmlFor="screening-language">Language</label>
                        <input type="text" id="screening-language" name="screeningLanguage"></input>
                        <label htmlFor="screening-type">Screening Type</label>
                        <input type="text" id="screening-type" name="screeningType"></input>
                        <label htmlFor="screening-movie">Movie</label>
                        <select id="screening-movie" name="screeningMovie">
                            {this.renderMovies()}
                        </select>
                        <label htmlFor="screening-theater" >Theater</label>
                        <select id="screening-theater" name="screeningTheater">
                            {this.renderObjects(false)}
                        </select>
                        <div className="button-container">
                            <button id="screening-submit" className="submit-button">Add</button>
                            <button id="screening-remove" className="remove-button" disabled>Delete</button>
                        </div>
                    </form>

                    {/* The form to edit movies */}
                    <form id="movie-edit">
                        <div className="title">Movies</div>
                        <label htmlFor="movie">Movie</label>
                        <select id="movie">
                            <option value="0">New Movie</option>
                            {this.renderMovies()}
                        </select>
                        <label htmlFor="movie-imdbId">IMDB ID</label>
                        <input type="text" id="movie-imdb-id" name="movieImdbId"></input>
                        <label htmlFor="movie-title">Title</label>
                        <input type="text" id="movie-title" name="movieTitle" disabled></input>
                        <div className="button-container">
                            <button id="movie-submit" className="submit-button">Add</button>
                            <button id="movie-remove" className="remove-button" disabled>Delete</button>
                        </div>
                    </form>

                    {/* The form to edit users */}
                    <form id="user-edit">
                        <div className="title">Users</div>
                        <label htmlFor="user">Movie</label>
                        <select id="user">
                            <option value="0">No User Selected</option>
                            {this.renderUsers()}
                        </select>
                        <label htmlFor="user-name">Username</label>
                        <input type="text" id="user-name" name="userName" disabled></input>
                        <label htmlFor="user-mail">User Mail</label>
                        <input type="text" id="user-mail" name="userMail" disabled></input>
                        <div className="button-container">
                            <button id="user-submit" className="submit-button">Edit</button>
                            <button id="user-remove" className="remove-button">Delete</button>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}
