import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from "react-dom";
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import fetchMock from 'jest-fetch-mock';
import Screening from '../Pages/Screening/Screening';

const screeningInfo = { "success": true, "message": { "screening": { "id": 15, "language": "English", "movieType": "2D", "date": "2020-06-19T18:30:00", "movie": { "id": 4, "title": "Call Me By Your Name", "imdbID": "tt5726616" }, "theater": { "id": 2, "name": "alphabeta", "cinema": { "id": 1, "name": "CineStars Roosendaal", "address": "Wilstraat 34" } } }, "chairs": [{ "id": 36, "type": "Standard" }, { "id": 37, "type": "Standard" }, { "id": 38, "type": "Standard" }, { "id": 39, "type": "Standard" }, { "id": 40, "type": "Standard" }, { "id": 41, "type": "Standard" }, { "id": 42, "type": "Standard" }, { "id": 43, "type": "Standard" }, { "id": 44, "type": "Standard" }, { "id": 45, "type": "Standard" }, { "id": 46, "type": "Standard" }, { "id": 47, "type": "Standard" }, { "id": 48, "type": "Standard" }, { "id": 49, "type": "Standard" }, { "id": 50, "type": "Standard" }, { "id": 51, "type": "Standard" }, { "id": 52, "type": "Standard" }, { "id": 53, "type": "Standard" }, { "id": 54, "type": "Standard" }, { "id": 55, "type": "Standard" }, { "id": 56, "type": "Standard" }, { "id": 57, "type": "Standard" }, { "id": 58, "type": "Standard" }, { "id": 59, "type": "Standard" }, { "id": 60, "type": "Standard" }, { "id": 61, "type": "Standard" }, { "id": 62, "type": "Standard" }, { "id": 63, "type": "Standard" }, { "id": 64, "type": "Standard" }, { "id": 65, "type": "Standard" }, { "id": 66, "type": "Standard" }, { "id": 67, "type": "Standard" }, { "id": 68, "type": "Standard" }, { "id": 69, "type": "Standard" }, { "id": 70, "type": "Standard" }] } };
const reservations = { "success": true, "message": [{ "id": 50, "chair": { "id": 56, "type": "Standard" }, "screening": { "id": 15, "language": "English", "movieType": "2D", "date": "2020-06-19T18:30:00", "movie": { "id": 4, "title": "Call Me By Your Name", "imdbID": "tt5726616" }, "theater": { "id": 2, "number": 2, "cinema": { "id": 1, "name": "CineStars Roosendaal", "address": "Wilstraat 34" } } } }, { "id": 51, "chair": { "id": 48, "type": "Standard" }, "screening": { "id": 15, "language": "English", "movieType": "2D", "date": "2020-06-19T18:30:00", "movie": { "id": 4, "title": "Call Me By Your Name", "imdbID": "tt5726616" }, "theater": { "id": 2, "number": 2, "cinema": { "id": 1, "name": "CineStars Roosendaal", "address": "Wilstraat 34" } } } }, { "id": 52, "chair": { "id": 47, "type": "Standard" }, "screening": { "id": 15, "language": "English", "movieType": "2D", "date": "2020-06-19T18:30:00", "movie": { "id": 4, "title": "Call Me By Your Name", "imdbID": "tt5726616" }, "theater": { "id": 2, "number": 2, "cinema": { "id": 1, "name": "CineStars Roosendaal", "address": "Wilstraat 34" } } } }, { "id": 53, "chair": { "id": 55, "type": "Standard" }, "screening": { "id": 15, "language": "English", "movieType": "2D", "date": "2020-06-19T18:30:00", "movie": { "id": 4, "title": "Call Me By Your Name", "imdbID": "tt5726616" }, "theater": { "id": 2, "number": 2, "cinema": { "id": 1, "name": "CineStars Roosendaal", "address": "Wilstraat 34" } } } }, { "id": 54, "chair": { "id": 58, "type": "Standard" }, "screening": { "id": 15, "language": "English", "movieType": "2D", "date": "2020-06-19T18:30:00", "movie": { "id": 4, "title": "Call Me By Your Name", "imdbID": "tt5726616" }, "theater": { "id": 2, "number": 2, "cinema": { "id": 1, "name": "CineStars Roosendaal", "address": "Wilstraat 34" } } } }, { "id": 55, "chair": { "id": 54, "type": "Standard" }, "screening": { "id": 15, "language": "English", "movieType": "2D", "date": "2020-06-19T18:30:00", "movie": { "id": 4, "title": "Call Me By Your Name", "imdbID": "tt5726616" }, "theater": { "id": 2, "number": 2, "cinema": { "id": 1, "name": "CineStars Roosendaal", "address": "Wilstraat 34" } } } }] };

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

it('Login screen visible for guest', async () => {
    fetchMock.mockResponses([JSON.stringify(screeningInfo), { status: 200 }], [JSON.stringify(reservations), { status: 200 }]);

    await act(async () => {
        render(<Router history={createMemoryHistory()}><Screening match={{ params: { id: 15 } }}/></Router>, container);
    });

    expect(container.textContent).toBe('Go BackCall Me By Your Name18:30 - CineStars Roosendaal - alphabeta1234567891011121314151617181920212223242526272829303132333435You have selected 0 chairsConfirm ReservationLoginSign UpLoading...Okay!Okay!');

    expect(document.getElementById('overlay').style.display).toBe('flex');
});

it('Properly show all (reserved) chairs', async () => {
    sessionStorage.setItem('jwtoken', 'randomtoken');

    fetchMock.mockResponses([JSON.stringify(screeningInfo), { status: 200 }], [JSON.stringify(reservations), { status: 200 }]);

    await act(async () => {
        render(<Router history={createMemoryHistory()}><Screening match={{ params: { id: 15 } }} /></Router>, container);
    });

    expect(document.getElementsByClassName('chair').length).toBe(35);
    expect(document.getElementsByClassName('reserved').length).toBe(6);
});

it('Get a good confirmation of the chosen chairs', async () => {
    sessionStorage.setItem('jwtoken', 'randomtoken');

    const backEndResponse = {success: true, message: "Amazing confirmation, wow!"}

    fetchMock.mockResponses([JSON.stringify(screeningInfo), { status: 200 }], [JSON.stringify(reservations), { status: 200 }], [JSON.stringify(backEndResponse), {status: 200}]);

    await act(async () => {
        render(<Router history={createMemoryHistory()}><Screening match={{ params: { id: 15 } }} /></Router>, container);
    });

    document.getElementsByClassName('chair')[0].click();
    document.getElementsByClassName('chair')[1].click();

    expect(document.getElementsByClassName('chosen').length).toBe(2);

    document.getElementsByClassName('chair')[1].click();

    expect(document.getElementsByClassName('chosen').length).toBe(1);

    document.getElementById('confirm-button').click();
    expect(document.getElementById('login-form').style.display).toBe('none');
});