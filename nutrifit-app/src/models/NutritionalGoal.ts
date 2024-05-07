import { Energy } from "./valueObjects/Energy"
import { Weight } from "./valueObjects/Weight"

export default class NutritionalGoal{
    energy_goal: Energy;
    proteins_goal: Weight;
    fats_goal: Weight;
    carbohydrates_goal: Weight;
    active_eg: boolean;
    active_pg: boolean;
    active_cg: boolean;
    active_fg: boolean;

    constructor(energy: Energy, proteins: Weight, fats: Weight, carbohydrates: Weight, active_eg: boolean, active_pg: boolean, active_cg: boolean, active_fg: boolean){
        this.energy_goal = energy;
        this.proteins_goal = proteins;
        this.fats_goal = fats;
        this.carbohydrates_goal = carbohydrates;
        this.active_eg = active_eg;
        this.active_pg = active_pg;
        this.active_cg = active_cg;
        this.active_fg = active_fg;
    }
}