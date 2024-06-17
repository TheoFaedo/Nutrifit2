import { FunctionComponent, useEffect, useState } from "react";
import Button from "../Button";
import MultipleDoughnutChart from "../MultipleDoughnutChart";
import NumberInput from "../NumberInput";
import {
  getnutritionalgoal,
  changenutritionalgoal,
} from "../../services/api-service";
import { useToasts } from "../../context/ToastContext";
import Loader from "../Loader";
import { Energy, EnergyInKcal } from "../../models/valueObjects/Energy";
import {
  MACRO_TYPES,
  Weight,
  WeightInGrams,
} from "../../models/valueObjects/Weight";
import { stringToNumberFormat } from "../../helpers/fieldHelper";
import { useTranslation } from "react-i18next";

type Form = {
  energy: Energy;
  carbos: Weight;
  fats: Weight;
  proteins: Weight;
  active_e: boolean;
  active_p: boolean;
  active_f: boolean;
  active_c: boolean;
};

const ChangingGoalTile: FunctionComponent = () => {
  const { t } = useTranslation();

  const { pushToast } = useToasts();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<Form>({
    energy: EnergyInKcal.create(0),
    carbos: WeightInGrams.create(0),
    fats: WeightInGrams.create(0),
    proteins: WeightInGrams.create(0),
    active_e: true,
    active_p: true,
    active_f: true,
    active_c: true,
  });

  useEffect(() => {
    getnutritionalgoal().then((res) => {
      setForm({
        energy: res.energy_goal,
        carbos: res.carbohydrates_goal,
        fats: res.fats_goal,
        proteins: res.proteins_goal,
        active_e: res.active_eg,
        active_p: res.active_pg,
        active_f: res.active_fg,
        active_c: res.active_cg,
      });
      setLoading(false);
    });
  }, []);

  const handleChangeGoal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = stringToNumberFormat(e.target.value);

    let updatedEnergy = form.energy;
    let updatedCarbos = form.carbos;
    let updatedFats = form.fats;
    let updatedProteins = form.proteins;

    if (name === "energy") {
      updatedEnergy = EnergyInKcal.create(value);
      const coef = value / 25;
      updatedCarbos = WeightInGrams.create(coef * 2);
      updatedFats = WeightInGrams.create(coef);
      updatedProteins = WeightInGrams.create(coef * 2);
    } else if (name === "carbos") {
      updatedCarbos = WeightInGrams.create(value);
      updatedEnergy = EnergyInKcal.fromMacros(
        updatedCarbos,
        updatedProteins,
        updatedFats
      );
    } else if (name === "fats") {
      updatedFats = WeightInGrams.create(value);
      updatedEnergy = EnergyInKcal.fromMacros(
        updatedCarbos,
        updatedProteins,
        updatedFats
      );
    } else if (name === "proteins") {
      updatedProteins = WeightInGrams.create(value);
      updatedEnergy = EnergyInKcal.fromMacros(
        updatedCarbos,
        updatedProteins,
        updatedFats
      );
    }

    setForm({
      ...form,
      energy: EnergyInKcal.create(Math.round(updatedEnergy.value)),
      carbos: WeightInGrams.create(Math.round(updatedCarbos.value)),
      fats: WeightInGrams.create(Math.round(updatedFats.value)),
      proteins: WeightInGrams.create(Math.round(updatedProteins.value)),
    });
  };

  const handleChangeActiveGoal = (goal_id: string) => {
    switch(goal_id) {
      case "energy":
        setForm({
          ...form,
          active_e: !form.active_e
        });
        break;
      case "carbos":
        setForm({
          ...form,
          active_c: !form.active_c
        });
        break;
      case "fats":
        setForm({
          ...form,
          active_f: !form.active_f
        });
        break;
      case "proteins":
        setForm({
          ...form,
          active_p: !form.active_p
        });
        break;
      default:
        break;
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    changenutritionalgoal({
      energy_goal: form.energy,
      carbohydrates_goal: form.carbos,
      fats_goal: form.fats,
      proteins_goal: form.proteins,
      active_eg: form.active_e,
      active_pg: form.active_p,
      active_fg: form.active_f,
      active_cg: form.active_c,
    }).then((res) => {
      if (res.success)
        pushToast({ content: t("ProfilePage.GoalSavedSuccessToast") });
      else
        pushToast({
          content: t("ProfilePage.GoalSavedFailedToast"),
          type: "error",
        });
    });
  };

  return (
    <form className="changing_goal_tile" onSubmit={handleSubmit}>
      <div className="tile_title text-left">
        {t("ProfilePage.ChangeDailyGoalTileTitle")}
      </div>
      {loading ? (
        <div className="w-full flex items-center justify-center my-6">
          <Loader />
        </div>
      ) : (
        <div className="flex justify-evenly items-center changing_goal_tile_inside">
          <MultipleDoughnutChart
            nutriData={{
              energy: form.energy,
              energy_unit: "kcal",
              carbos: form.carbos.toKcal(MACRO_TYPES.CARBOHYDRATE),
              fats: form.fats.toKcal(MACRO_TYPES.FAT),
              proteins: form.proteins.toKcal(MACRO_TYPES.PROTEIN),
            }}
          />
          <div className="ml-2 text-white">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <span
                    className="dot dot-grow"
                    style={{ backgroundColor: form.active_e ? "#FFFFFF" : "#999999" }}
                    onClick={() => handleChangeActiveGoal("energy")}
                  ></span>
                  <span>{t("Macros.Energy")}</span>
                </div>
                <div className="flex items-center">
                  <NumberInput
                    name="energy"
                    value={form.energy.value}
                    maxlength={4}
                    placeholder="kcal"
                    onChange={handleChangeGoal}
                  />
                  <span className="w-8">kcal</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <span
                    className="dot dot-grow"
                    style={{ backgroundColor: form.active_c ? "#38D386" : "#999999" }}
                    onClick={() => handleChangeActiveGoal("carbos")}
                  ></span>
                  <span className="overflow-hidden">
                    {t("Macros.Carbohydrates")}
                  </span>
                </div>
                <div className="flex items-center">
                  <NumberInput
                    name="carbos"
                    value={form.carbos.value}
                    maxlength={4}
                    placeholder="g"
                    onChange={handleChangeGoal}
                  />
                  <span className="w-8">g</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <span
                    className="dot dot-grow"
                    style={{ backgroundColor: form.active_f ? "#CC57F5" : "#999999" }}
                    onClick={() => handleChangeActiveGoal("fats")}
                  ></span>
                  {t("Macros.Fats")}
                </div>
                <div className="flex items-center">
                  <NumberInput
                    name="fats"
                    value={form.fats.value}
                    maxlength={4}
                    placeholder="g"
                    onChange={handleChangeGoal}
                  />
                  <span className="w-8">g</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <span
                    className="dot dot-grow"
                    style={{ backgroundColor: form.active_p ? "#EEBD30" : "#999999" }}
                    onClick={() => handleChangeActiveGoal("proteins")}
                  ></span>
                  {t("Macros.Proteins")}
                </div>
                <div className="flex items-center">
                  <NumberInput
                    name="proteins"
                    value={form.proteins.value}
                    maxlength={4}
                    placeholder="g"
                    onChange={handleChangeGoal}
                  />
                  <span className="w-8">g</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Button name={t("ProfilePage.SaveGoalButton")} submit />
    </form>
  );
};

export default ChangingGoalTile;
