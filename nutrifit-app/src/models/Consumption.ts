import Consumable from "./Consumable";

export default class Consumption{
    idConsumption?: number;
    consumable: Consumable;
    idUser: string|undefined;
    consumed_on: Date;
    last_update: Date;
    proportion: number;

    constructor(
        idConsumption: number,
        consumable: Consumable,
        idUser: string|undefined,
        consumed_on: Date = new Date(),
        last_update: Date = new Date(),
        proportion: number = 1
    ){
        this.idConsumption = idConsumption;
        this.consumable = consumable;
        this.idUser = idUser;
        this.consumed_on = consumed_on;
        this.last_update = last_update;
        this.proportion = proportion;
    }
}