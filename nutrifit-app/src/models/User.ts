import Mail from "./valueObjects/Mail";

export default class User{
    username: string;
    gender: string;
    token: string;
    mail: Mail;

    constructor(
        username: string,
        gender: string,
        token: string,
        mail: Mail,
    ){
        this.username = username;
        this.gender = gender;
        this.token = token;
        this.mail = mail;
    }
}