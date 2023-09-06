import Consumption from "../models/Consumption";

export function consumptionsValNutSum(consumptionList: Consumption[]){
    const res = {
        proteins: 0,
        fats: 0,
        carbohydrates: 0,
        energy: 0
    };

    consumptionList.forEach(consumption => {
        res.proteins += consumption.proportion * consumption.consumable.proteins;
        res.fats += consumption.proportion * consumption.consumable.fats;
        res.carbohydrates += consumption.proportion * consumption.consumable.carbohydrates;
        res.energy += consumption.proportion * consumption.consumable.energy;
    })

    return res;
}