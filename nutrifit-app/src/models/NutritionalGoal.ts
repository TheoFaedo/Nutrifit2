import { Energy } from "./valueObjects/Energy"
import { Weight } from "./valueObjects/Weight"

export default class NutritionalGoal{
    energy_goal: Energy;
    proteins_goal: Weight;
    fats_goal: Weight;
    carbohydrates_goal: Weight;

    constructor(energy: Energy, proteins: Weight, fats: Weight, carbohydrates: Weight){
        this.energy_goal = energy;
        this.proteins_goal = proteins;
        this.fats_goal = fats;
        this.carbohydrates_goal = carbohydrates;
    }
}