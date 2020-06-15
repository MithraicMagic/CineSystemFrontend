import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from "react-dom";
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import fetchMock from 'jest-fetch-mock';
import MovieInfo from './../Pages/Movie/Movie';
import Screenings from '../Components/Screenings/Screenings';

let container = null;

const movieInfo = { "Title": "Inception", "Year": "2010", "Rated": "PG-13", "Released": "16 Jul 2010", "Runtime": "148 min", "Genre": "Action, Adventure, Sci-Fi, Thriller", "Director": "Christopher Nolan", "Writer": "Christopher Nolan", "Actors": "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy", "Plot": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", "Language": "English, Japanese, French", "Country": "USA, UK", "Awards": "Won 4 Oscars. Another 152 wins & 217 nominations.", "Poster": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", "Ratings": [{ "Source": "Internet Movie Database", "Value": "8.8/10" }, { "Source": "Rotten Tomatoes", "Value": "87%" }, { "Source": "Metacritic", "Value": "74/100" }], "Metascore": "74", "imdbRating": "8.8", "imdbVotes": "1,968,969", "imdbID": "tt1375666", "Type": "movie", "DVD": "N/A", "BoxOffice": "N/A", "Production": "N/A", "Website": "N/A", "Response": "True" };
const movie = { "id": 4, "title": "Call Me By Your Name", "imdbID": "tt5726616" };

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('Page shows movie info properly', async () => {
    fetchMock.mockResponses([JSON.stringify(movie), { status: 200 }], [JSON.stringify({ success: true, message: [] }), { status: 200 }], [JSON.stringify(movieInfo), { status: 200 }]);

    await act(async () => {
        render(<MovieInfo match={{ params: { id: 4 } }} />, container);
    });

    expect(document.getElementsByClassName('subject').length).toBe(7);
    expect(document.getElementsByClassName('poster')[0].src).toBe('https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg');

    expect(container.textContent).toBe('Inception8.8/1074/100Length: 148 minGenre: Action, Adventure, Sci-Fi, ThrillerDirector: Christopher NolanWriter: Christopher NolanActors: Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom HardyProducer: N/ASummary: A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.ScreeningsThere are no screenings for this movie');
});

it('Render screenings properly', async () => {
    fetchMock.once(JSON.stringify({ "success": true, "message": [{ "id": 15, "language": "English", "movieType": "2D", "date": "2020-06-19T18:30:00", "movie": { "id": 4, "title": "Call Me By Your Name", "imdbID": "tt5726616" }, "theater": { "id": 2, "number": 2, "cinema": { "id": 1, "name": "CineStars Roosendaal", "address": "Wilstraat 34" } } }, { "id": 16, "language": "English", "movieType": "2D", "date": "2020-06-18T19:30:00", "movie": { "id": 4, "title": "Call Me By Your Name", "imdbID": "tt5726616" }, "theater": { "id": 5, "number": 1, "cinema": { "id": 2, "name": "CineStars Breda", "address": "Freeklaan 643" } } }, { "id": 17, "language": "English", "movieType": "2D", "date": "2020-06-19T23:55:00", "movie": { "id": 4, "title": "Call Me By Your Name", "imdbID": "tt5726616" }, "theater": { "id": 7, "number": 3, "cinema": { "id": 2, "name": "CineStars Breda", "address": "Freeklaan 643" } } }] }));

    await act(async () => {
        render(<Router history={createMemoryHistory()}><Screenings movieId={4}></Screenings></Router>, container);
    });

    const cinemas = document.getElementsByClassName('cinema-name');
    const dates = document.getElementsByClassName('date');

    expect(cinemas.length).toBe(2);
    expect(dates.length).toBe(3);

    expect(cinemas[0].textContent).toBe('CineStars Roosendaal');
    expect(cinemas[1].textContent).toBe('CineStars Breda');

    expect(dates[0].textContent).toBe('Friday18:30 2D');
    expect(dates[1].textContent).toBe('Thursday19:30 2D');
    expect(dates[2].textContent).toBe('Friday23:55 2D');
});