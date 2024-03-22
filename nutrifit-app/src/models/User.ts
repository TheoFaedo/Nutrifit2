import Mail from "./valueObjects/Mail";

export default class User{
    username: string;
    gender: string;
    token: string;
    mail: Mail;
    exp: number;
    level: number;
    pp: string;

    constructor(
        username: string,
        gender: string,
        token: string,
        mail: Mail,
        exp: number = 0,
        level: number = 1,
        pp: string = ""
    ){
        this.username = username;
        this.gender = gender;
        this.token = token;
        this.mail = mail;
        this.exp = exp;
        this.level = level;
        this.pp = pp;
    }
}