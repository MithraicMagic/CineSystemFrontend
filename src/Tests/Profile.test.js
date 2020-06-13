import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from "react-dom";
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import fetchMock from 'jest-fetch-mock';
import Profile from './../Pages/Profile/Profile';

let container = null;

const noReservationProfile = { "success": true, "message": { "user": { "id": 34, "username": "Freekje", "mail": "freek@freek.nl", "icon": { "id": 1, "source": "001-man.svg" } }, "reservations": [] } };
const profile = { "success": true, "message": { "user": { "id": 1, "username": "username", "mail": "email@mail.nl", "icon": { "id": 19, "source": "035-man.svg" } }, "reservations": [{ "id": 11, "chair": { "id": 36, "type": "Standard" }, "screening": { "id": 7, "language": "English", "movieType": "2D", "date": "2020-06-11T20:30:00", "movie": { "id": 1, "title": "Inception", "imdbID": "tt1375666" }, "theater": { "id": 2, "number": 2, "cinema": { "id": 1, "name": "CineStars Roosendaal", "address": "Wilstraat 34" } } } }] } };
const availableIcons = [{ "id": 1, "source": "001-man.svg" }, { "id": 2, "source": "002-man.svg" }, { "id": 3, "source": "003-man.svg" }, { "id": 4, "source": "004-man.svg" }, { "id": 5, "source": "005-man.svg" }, { "id": 6, "source": "006-man.svg" }, { "id": 7, "source": "007-man.svg" }, { "id": 8, "source": "008-man.svg" }, { "id": 9, "source": "009-man.svg" }, { "id": 10, "source": "018-man.svg" }, { "id": 11, "source": "019-man.svg" }, { "id": 12, "source": "020-man.svg" }, { "id": 13, "source": "021-man.svg" }, { "id": 14, "source": "022-man.svg" }, { "id": 15, "source": "023-man.svg" }, { "id": 16, "source": "024-man.svg" }, { "id": 17, "source": "025-man.svg" }, { "id": 18, "source": "026-man.svg" }, { "id": 19, "source": "035-man.svg" }, { "id": 20, "source": "036-man.svg" }, { "id": 21, "source": "037-man.svg" }, { "id": 22, "source": "038-man.svg" }, { "id": 23, "source": "039-man.svg" }, { "id": 24, "source": "040-man.svg" }, { "id": 25, "source": "041-man.svg" }, { "id": 26, "source": "042-man.svg" }, { "id": 27, "source": "010-woman.svg" }, { "id": 28, "source": "011-woman.svg" }, { "id": 29, "source": "012-woman.svg" }, { "id": 30, "source": "013-woman.svg" }, { "id": 31, "source": "014-woman.svg" }, { "id": 32, "source": "015-woman.svg" }, { "id": 33, "source": "016-woman.svg" }, { "id": 34, "source": "017-woman.svg" }, { "id": 35, "source": "027-woman.svg" }, { "id": 36, "source": "028-woman.svg" }, { "id": 37, "source": "029-woman.svg" }, { "id": 38, "source": "030-woman.svg" }, { "id": 39, "source": "031-woman.svg" }, { "id": 40, "source": "032-woman.svg" }, { "id": 41, "source": "033-woman.svg" }, { "id": 42, "source": "034-woman.svg" }, { "id": 43, "source": "043-woman.svg" }, { "id": 44, "source": "044-woman.svg" }, { "id": 45, "source": "045-woman.svg" }, { "id": 46, "source": "046-woman.svg" }, { "id": 47, "source": "047-woman.svg" }, { "id": 48, "source": "048-woman.svg" }, { "id": 49, "source": "049-woman.svg" }, { "id": 50, "source": "050-woman.svg" }, { "id": 51, "source": "bananas.svg" }];

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('render profile correctly without any reservations', async () => {
    sessionStorage.setItem('jwtoken', 'randomtoken');

    fetchMock.mockResponses([JSON.stringify(noReservationProfile), { status: 200 }], [JSON.stringify(availableIcons), { status: 200 }]);

    await act(async () => {
        render(<Router history={createMemoryHistory()}><Profile /></Router>, container);
    });

    expect(document.getElementsByClassName('message')[0].textContent).toBe('You do not have any reservations yet')
});

it('avaiable icons are properly rendered', async () => {
    sessionStorage.setItem('jwtoken', 'randomtoken');

    fetchMock.mockResponses([JSON.stringify(noReservationProfile), { status: 200 }], [JSON.stringify(availableIcons), { status: 200 }]);

    await act(async () => {
        render(<Router history={createMemoryHistory()}><Profile /></Router>, container);
    });

    expect(document.getElementsByClassName('available-icon').length).toBe(51);

    expect(document.getElementById('overlay').classList.contains('hidden')).toBe(true);
    document.getElementById('user-icon').click();
    expect(document.getElementById('overlay').classList.contains('hidden')).toBe(false);
})