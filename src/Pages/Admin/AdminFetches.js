export default class AdminFetches {
    static async getObjects() {
        let cinemas;
        let theaters;
        let screenings;
        let movies;

        await fetch('https://ikhoudvanfilms.com/api/cinemas/all').then(res => res.json()).then(res => cinemas = res);
        await fetch('https://ikhoudvanfilms.com/api/theaters/all').then(res => res.json()).then(res => theaters = res);
        await fetch('https://ikhoudvanfilms.com/api/screenings/all').then(res => res.json()).then(res => screenings = res);
        await fetch('https://ikhoudvanfilms.com/api/movies/all').then(res => res.json()).then(res => movies = res);

        return {cinemas, theaters, screenings, movies}
    }

    static async postCinema() {
        await fetch('')
    }
}