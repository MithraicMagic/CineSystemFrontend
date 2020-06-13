// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';

beforeAll(() => {
    fetchMock.enableMocks();
})

beforeEach(() => {
    sessionStorage.clear();
    fetchMock.resetMocks();
});
