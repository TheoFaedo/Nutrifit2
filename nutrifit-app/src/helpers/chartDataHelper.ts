
export const doughnutChartPercentToProportions = (data: any) => {
    let sum = data.proteins + data.fats + data.carbos;
    if(sum > 100){
        return [0, data.carbos, data.fats, data.proteins, 0];
    }
    return [0, data.carbos, data.fats, data.proteins, 100-sum];
} 