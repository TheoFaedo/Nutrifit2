import { Energy } from "../models/valueObjects/Energy";

type MacrosEnergySet = {
    carbos: Energy,
    fats: Energy,
    proteins: Energy
}

export const doughnutChartPercentToProportions = (data: MacrosEnergySet) => {

    const carbos = data.carbos.value;
    const fats = data.fats.value;
    const proteins = data.proteins.value;

    let sum = carbos + fats + proteins;
    if(sum > 100){
        return [0, carbos, fats, proteins, 0];
    }
    return [0, carbos, fats, proteins, 100-sum];
}

export const doughnutChartProportionsToProportions = (data: MacrosEnergySet) => {
    const carbos = data.carbos.value;
    const fats = data.fats.value;
    const proteins = data.proteins.value;

    let sum = carbos + fats + proteins;
    if(sum > 0){
        return [0, carbos, fats, proteins, 0];
    }
    return [0, 0, 0, 0, 1];
}