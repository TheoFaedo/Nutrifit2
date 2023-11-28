import { Energy, EnergyInKcal } from "./valueObjects/Energy";
import { Weight, WeightInGrams } from "./valueObjects/Weight";

export default class Consumable{


    idConsumable?: number;
    name: string;
    energy: Energy;
    fats: Weight;
    carbohydrates: Weight;
    proteins: Weight;
    quantity_label: string;
    is_public: boolean;
    type: string;
    author?: number;
    proportion?: number;
    ingredients: Consumable[];

    constructor(
        idConsumable: number = -1,
        name: string = "undefined",
        energy: Energy = EnergyInKcal.create(0),
        fats: Weight = WeightInGrams.create(0),
        carbohydrates: Weight = WeightInGrams.create(0),
        proteins: Weight = WeightInGrams.create(0),
        quantity_label: string = "1g",
        is_public: boolean = true,
        type: string = "MEAL",
        author: number = -1,
        ingredients: (Consumable&Number)[] = []
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