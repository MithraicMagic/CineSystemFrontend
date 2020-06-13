import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from "react-dom";
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Movie from './../Components/Movie/Movie';
import Home from './../Pages/Home/Home';

let container = null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("Movies are rendered with info", async () => {
    const movieInfo = { "Title": "Inception", "Year": "2010", "Rated": "PG-13", "Released": "16 Jul 2010", "Runtime": "148 min", "Genre": "Action, Adventure, Sci-Fi, Thriller", "Director": "Christopher Nolan", "Writer": "Christopher Nolan", "Actors": "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy", "Plot": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", "Language": "English, Japanese, French", "Country": "USA, UK", "Awards": "Won 4 Oscars. Another 152 wins & 217 nominations.", "Poster": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", "Ratings": [{ "Source": "Internet Movie Database", "Value": "8.8/10" }, { "Source": "Rotten Tomatoes", "Value": "87%" }, { "Source": "Metacritic", "Value": "74/100" }], "Metascore": "74", "imdbRating": "8.8", "imdbVotes": "1,968,969", "imdbID": "tt1375666", "Type": "movie", "DVD": "N/A", "BoxOffice": "N/A", "Production": "N/A", "Website": "N/A", "Response": "True" };

    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(movieInfo)
        })
    );

    await act(async () => {
        render(<Router history={createMemoryHistory()}><Movie /></Router>, container);
    });

    expect(container.textContent).toBe('Inception2010');
});

it('Home page is rendered properly without any movies', async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve([])
        })
    );

    await act(async () => {
        render(<Home/>, container);
    })

    expect(container.textContent).toBe('Now in TheatersThe best trending movies, all playing in one cinemaGreat quality screens, showing the movies in all of their gloryGet your tickets with our easy reservation system');
});