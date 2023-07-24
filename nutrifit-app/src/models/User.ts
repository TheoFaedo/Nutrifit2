export default class User{
    id: number;
    username: string;
    gender: string;
    token: string;
    mail: string;
    energy_goal: number;
    fats_goal: number;
    carbohydrates_goal: number;
    proteins_goal: number;

    constructor(
        id: number,
        username: string,
        gender: string,
        token: string,
        mail: string,
        energy_goal: number,
        fats_goal: number,
        carbohydrates_goal: number,
        proteins_goal: number
    ){
        this.id = id;
        this.username = username;
        this.gender = gender;
        this.token = token;
        this.mail = mail;
        this.energy_goal = energy_goal;
        this.fats_goal = fats_goal;
        this.carbohydrates_goal = carbohydrates_goal;
        this.proteins_goal = proteins_goal;
    }
}