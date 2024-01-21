import Consumable from "./Consumable";

export enum Meal {
    BREAKFAST = "BREAKFAST",
    LUNCH = "LUNCH",
    DINNER = "DINNER",
    SNACKS = "SNACKS"
}

export default class Consumption{
    idConsumption?: number;
    consumable: Consumable;
    idUser: string|undefined;
    consumed_on: Date;
    last_update: Date;
    proportion: number;
    meal: Meal;

    constructor(
        idConsumption: number,
        consumable: Consumable,
        idUser: string|undefined,
        consumed_on: Date = new Date(),
        last_update: Date = new Date(),
        proportion: number = 1,
        meal: Meal = Meal.LUNCH
    ){
        this.idConsumption = idConsumption;
        this.consumable = consumable;
        this.idUser = idUser;
        this.consumed_on = consumed_on;
        this.last_update = last_update;
        this.proportion = proportion;
        this.meal = meal;
    }
}