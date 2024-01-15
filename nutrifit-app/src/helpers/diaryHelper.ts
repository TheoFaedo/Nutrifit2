import Consumption from "../models/Consumption";
import { EnergyInKcal } from "../models/valueObjects/Energy";
import { WeightInGrams } from "../models/valueObjects/Weight";

export function consumptionsValNutSum(consumptionList: Consumption[]) {
  const res = {
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    energy: 0,
  };

  consumptionList.forEach((consumption) => {
    res.proteins +=
      consumption.proportion * consumption.consumable.proteins.value;
    res.fats += consumption.proportion * consumption.consumable.fats.value;
    res.carbohydrates +=
      consumption.proportion * consumption.consumable.carbohydrates.value;
    res.energy += consumption.proportion * consumption.consumable.energy.value;
  });

  console.log({
    proteins: WeightInGrams.create(Math.round(res.proteins)),
    fats: WeightInGrams.create(Math.round(res.fats)),
    carbohydrates: WeightInGrams.create(Math.round(res.carbohydrates)),
    energy: EnergyInKcal.create(Math.round(res.energy)),
  })

  return {
    proteins: WeightInGrams.create(Math.round(res.proteins)),
    fats: WeightInGrams.create(Math.round(res.fats)),
    carbohydrates: WeightInGrams.create(Math.round(res.carbohydrates)),
    energy: EnergyInKcal.create(Math.round(res.energy)),
  };
}
