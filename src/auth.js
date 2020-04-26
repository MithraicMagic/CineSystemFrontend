export default class Auth {

    static isTokenPresent() {
        return sessionStorage.getItem('jwtoken') != null;
    }

}