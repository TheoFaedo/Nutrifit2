import { FunctionComponent, useCallback, useEffect, useMemo, useState } from "react";
import DoughnutChart from "../DoughnutChart";
import { confirmdailyconsumption, getnutritionalgoal } from "../../services/api-service";
import { consumptionsValNutSum } from "../../helpers/diaryHelper";
import NutritionalGoal from "../../models/NutritionalGoal";
import { WeightInGrams } from "../../models/valueObjects/Weight";
import { EnergyInKcal } from "../../models/valueObjects/Energy";
import { useTranslation } from "react-i18next";
import { ProgressBar } from "../ProgressBar";
import { formatDate } from "../../helpers/dateHelper";
import { useAuth } from "../../hooks/useAuth";
import Consumption from "../../models/Consumption";

type Props = {
  consumptionList: Consumption[];
  canConfirmGoal: boolean;
  setCanConfirmGoal: Function;
  date: Date;
  setLocked: Function;
}

const TrackingTile: FunctionComponent<Props> = ({consumptionList, canConfirmGoal, setCanConfirmGoal, date, setLocked}) => {
  const { t } = useTranslation();
  const { setLevelAndExp } = useAuth();

  const [nutritionalgoal, setNutritionalgoal] = useState<NutritionalGoal>({
    carbohydrates_goal: WeightInGrams.create(0),
    fats_goal: WeightInGrams.create(0),
    proteins_goal: WeightInGrams.create(0),
    energy_goal: EnergyInKcal.create(0),
    active_cg: true,
    active_eg: true,
    active_fg: true,
    active_pg: true,
  });

  const handleConfirmGoal = useCallback(() => {
    confirmdailyconsumption({day: formatDate(date)}).then((res) => {
      if(res.success){
        setLevelAndExp(res.level, res.xp);
        setCanConfirmGoal(false);
        setLocked(true);
      }
    })
  }, [date, setLevelAndExp, setCanConfirmGoal, setLocked]);

  useEffect(() => {
    getnutritionalgoal().then((res) => {
      setNutritionalgoal(res);
    });
  }, []);

  const nutritionalSum = useMemo(() => 
    consumptionsValNutSum(consumptionList), 
    [consumptionList]
  );

  const difTest = useCallback((difference: number) => {
    return difference >= 0 ? t("DiaryPage.left") : t("DiaryPage.over");
  }, [t]);

  const carbsDif =
    nutritionalgoal.carbohydrates_goal.value -
    nutritionalSum.carbohydrates.value;
  const fatsDif = nutritionalgoal.fats_goal.value - nutritionalSum.fats.value;
  const proteinsDif =
    nutritionalgoal.proteins_goal.value - nutritionalSum.proteins.value;
  const energyDif = nutritionalgoal.energy_goal.value - nutritionalSum.energy.value;

  return (
    <div className="macros_tile">
      <div className="tile_title text-left">
        {t("DiaryPage.TrackingTileTitle")}
      </div>
      <div className="flex justify-evenly items-start">
        <div className="flex flex-col items-center w-28 mx-1">
          <div className="mb-2 text-carbohydrates font-semibold text-md">
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
            {(carbsDif >= 0 ? carbsDif : -1 * carbsDif) + "g"}
            <br/>
            {difTest(carbsDif)}
          </div>
        </div>
        <div className="flex flex-col items-center w-28 mx-1">
          <div className="mb-2 text-fats font-semibold text-md">
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
            {(fatsDif >= 0 ? fatsDif : -1 * fatsDif) + "g"}
            <br/>
            {difTest(fatsDif)}
          </div>
        </div>
        <div className="flex flex-col items-center w-28 mx-1">
          <div className="mb-2 text-proteins font-semibold text-md">
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
            {(proteinsDif >= 0 ? proteinsDif : -1 * proteinsDif) + "g"}
            <br/>
            {difTest(proteinsDif)}
          </div>
        </div>
      </div>
      <div className="pt-4 mt-4 border-t-2 border-neutral-700">
        <div className="w-full flex justify-between mb-2">
            <div className="text-blue-400 font-semibold">Énergie</div>
            <div><span className={"font-semibold text-xl " + (energyDif >= 0 ? "text-neutral-400" : "text-red-500")}>{nutritionalSum.energy.value}</span><span className={(energyDif >= 0 ? "text-neutral-400" : "text-red-600")}>/{nutritionalgoal.energy_goal.value}kcal</span></div>
        </div>
        <ProgressBar progress={nutritionalSum.energy.value/nutritionalgoal.energy_goal.value} height="h-12"/>
        <div className={"mt-2 w-full text-center " + (energyDif >= 0 ? "text-neutral-400" : "text-red-500")} >{(energyDif >= 0 ? energyDif : -1 * energyDif)}kcal {difTest(energyDif)}</div>
      </div>
      {
        canConfirmGoal &&
        <div className="w-full">
            <button className="bg-main w-full h-12 rounded-full mt-4 shake"
                onClick={handleConfirmGoal}>
                Confirm goal (+10xp)
            </button>
        </div>
      }
    </div>
  );
};

export default TrackingTile;
