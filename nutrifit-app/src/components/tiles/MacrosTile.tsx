import { FunctionComponent, useCallback, useEffect, useState } from "react";
import DoughnutChart from "../DoughnutChart";
import { getnutritionalgoal } from "../../services/api-service";
import Consumption from "../../models/Consumption";
import { consumptionsValNutSum } from "../../helpers/diaryHelper";
import NutritionalGoal from "../../models/NutritionalGoal";
import { Weight, WeightInGrams } from "../../models/valueObjects/Weight";
import { Energy, EnergyInKcal } from "../../models/valueObjects/Energy";
import { useTranslation } from "react-i18next";

type NutritionalSum = {
  carbohydrates: Weight;
  fats: Weight;
  proteins: Weight;
  energy: Energy;
};

type Props = {
  consumptionList: Consumption[];
};

const MacrosTile: FunctionComponent<Props> = ({ consumptionList }) => {
  const { t } = useTranslation();

  const [nutritionalgoal, setNutritionalgoal] = useState<NutritionalGoal>({
    carbohydrates_goal: WeightInGrams.create(0),
    fats_goal: WeightInGrams.create(0),
    proteins_goal: WeightInGrams.create(0),
    energy_goal: EnergyInKcal.create(0),
  });

  const [nutritionalSum, setNutritionalSum] = useState<NutritionalSum>({
    carbohydrates: WeightInGrams.create(0),
    fats: WeightInGrams.create(0),
    proteins: WeightInGrams.create(0),
    energy: EnergyInKcal.create(0),
  });

  useEffect(() => {
    getnutritionalgoal().then((res) => {
      setNutritionalgoal(res);
    });
  }, []);

  useEffect(() => {
    setNutritionalSum(consumptionsValNutSum(consumptionList));
  }, [consumptionList]);

  const difTest = useCallback((difference: number) => {
    return difference >= 0 ? t("DiaryPage.left") : t("DiaryPage.over");
  }, [t]);

  const carbsDif =
    nutritionalgoal.carbohydrates_goal.value -
    nutritionalSum.carbohydrates.value;
  const fatsDif = nutritionalgoal.fats_goal.value - nutritionalSum.fats.value;
  const proteinsDif =
    nutritionalgoal.proteins_goal.value - nutritionalSum.proteins.value;

  return (
    <div className="macros_tile">
      <div className="tile_title text-left">
        {t("DiaryPage.MacrosTileTitle")}
      </div>
      <div className="flex justify-evenly items-start">
        <div className="flex flex-col items-center w-28 mx-1">
          <div className="mb-4 text-carbohydrates font-semibold text-md">
            {t("Macros.Carbohydrates")}
          </div>
          <DoughnutChart
            className="h-24 w-24"
            label={"Carbohydrates"}
            color={"#38D386"}
            value={nutritionalSum.carbohydrates.value}
            goal={nutritionalgoal.carbohydrates_goal.value}
          />
          <div
            className={
              "mt-2 " + (carbsDif >= 0 ? "text-neutral-400" : "text-red-500")
            }
          >
            {(carbsDif >= 0 ? carbsDif : -1 * carbsDif) +
              "g " +
              difTest(carbsDif)}
          </div>
        </div>
        <div className="flex flex-col items-center w-28 mx-1">
          <div className="mb-4 text-fats font-semibold text-md">
            {t("Macros.Fats")}
          </div>
          <DoughnutChart
            className="h-24 w-24"
            label={"Fats"}
            color={"#CC57F5"}
            value={nutritionalSum.fats.value}
            goal={nutritionalgoal.fats_goal.value}
          />
          <div
            className={
              "mt-2 " + (fatsDif >= 0 ? "text-neutral-400" : "text-red-500")
            }
          >
            {(fatsDif >= 0 ? fatsDif : -1 * fatsDif) + "g " + difTest(fatsDif)}
          </div>
        </div>
        <div className="flex flex-col items-center w-28 mx-1">
          <div className="mb-4 text-proteins font-semibold text-md">
            {t("Macros.Proteins")}
          </div>
          <DoughnutChart
            className="h-24 w-24"
            label={"Proteins"}
            color={"#EEBD30"}
            value={nutritionalSum.proteins.value}
            goal={nutritionalgoal.proteins_goal.value}
          />
          <div
            className={
              "mt-2 " + (proteinsDif >= 0 ? "text-neutral-400" : "text-red-500")
            }
          >
            {(proteinsDif >= 0 ? proteinsDif : -1 * proteinsDif) +
              "g " +
              difTest(proteinsDif)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacrosTile;
