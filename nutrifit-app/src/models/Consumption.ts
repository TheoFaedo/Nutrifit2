export default class Consumable{
    id: number;
    idConsumable: number;
    idUser: number;
    consumed_on: Date;
    last_update: Date;
    proportion: number;

    constructor(
        id: number,
        idConsumable: number,
        idUser: number,
        consumed_on: Date = new Date(),
        last_update: Date = new Date(),
        proportion: number = 1
    ){
        this.id = id;
        this.idConsumable = idConsumable;
        this.idUser = idUser;
        this.consumed_on = consumed_on;
        this.last_update = last_update;
        this.proportion = proportion;
    }
}