export default class Consumable{


    idConsumable?: number;
    name: string;
    energy: number;
    fats: number;
    carbohydrates: number;
    proteins: number;
    quantity_label: string;
    is_public: boolean;
    type: string;
    author?: number;
    proportion?: number;
    ingredients: Consumable[];

    constructor(
        idConsumable: number = -1,
        name: string = "undefined",
        energy: number = 0,
        fats: number = 0,
        carbohydrates: number = 0,
        proteins: number = 0,
        quantity_label: string = "1g",
        is_public: boolean = true,
        type: string = "MEAL",
        author: number = -1,
        ingredients: Consumable[] = []
    ){
        this.idConsumable = idConsumable;
        this.name = name;
        this.energy = energy;
        this.fats = fats;
        this.carbohydrates = carbohydrates;
        this.proteins = proteins;
        this.quantity_label = quantity_label;
        this.is_public = is_public;
        this.type = type;
        this.author = author;
        this.ingredients = ingredients;
    }
}