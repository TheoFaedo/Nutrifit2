import { zeroIfIsNaN } from "./nanHelper";

export const doughnutChartPercentToProportions = (data: any) => {

    const carbos = zeroIfIsNaN(data.carbos);
    const fats = zeroIfIsNaN(data.fats);
    const proteins = zeroIfIsNaN(data.proteins);

    let sum = carbos + fats + proteins;
    if(sum > 100){
        return [0, carbos, fats, proteins, 0];
    }
    return [0, carbos, fats, proteins, 100-sum];
}

export const doughnutChartProportionsToProportions = (data: any) => {
    const carbos = zeroIfIsNaN(data.carbos);
    const fats = zeroIfIsNaN(data.fats);
    const proteins = zeroIfIsNaN(data.proteins);

    let sum = carbos + fats + proteins;
    if(sum > 0){
        return [0, carbos, fats, proteins, 0];
    }
    return [0, 0, 0, 0, 1];
}