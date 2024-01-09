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

  return {
    proteins: WeightInGrams.create(res.proteins),
    fats: WeightInGrams.create(res.fats),
    carbohydrates: WeightInGrams.create(res.carbohydrates),
    energy: EnergyInKcal.create(res.energy),
  };
}
