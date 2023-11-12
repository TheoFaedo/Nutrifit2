export default class User{
    username: string;
    gender: string;
    token: string;
    mail: string;

    constructor(
        username: string,
        gender: string,
        token: string,
        mail: string,
    ){
        this.username = username;
        this.gender = gender;
        this.token = token;
        this.mail = mail;
    }
}