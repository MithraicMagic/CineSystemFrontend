export default class Auth {

    static isTokenPresent() {
        return sessionStorage.getItem('jwtoken') != null;
    }

    static isAdmin() {
        if (!sessionStorage.getItem('jwtoken')) {
            return false;
        }

        let token = sessionStorage.getItem('jwtoken').replace("Bearer ", "");
        return JSON.parse(atob(token.split('.')[1])).Role === "[Admin]";
    }

}