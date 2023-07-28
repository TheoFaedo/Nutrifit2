export default class AuthenticationService{
    static isAuthenticated: boolean = false;

    static authentify = () : void => {
        AuthenticationService.isAuthenticated = true;
    }

    static logout = () : void => {
        AuthenticationService.isAuthenticated = false;
    }
}