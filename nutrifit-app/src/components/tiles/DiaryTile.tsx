import { FunctionComponent, useEffect, useState } from "react";
import Consumption, { Meal } from "../../models/Consumption";
import {
  addConsumption,
  changeConsumption,
  consumptionListAtDate,
  removeConsumption,
} from "../../services/api-service";
import Button from "../Button";
import SearchConsumableDialog from "../dialog/SearchConsumableDialog";
import Consumable from "../../models/Consumable";
import Loader from "../Loader";
import { useAccount } from "../../hooks/useAccount";
import { ConsumableQuantityCard } from "../ConsumableQuantityCard";
import { useTranslation } from "react-i18next";

type Props = {
  date: Date;
  setConsumptionList: React.Dispatch<React.SetStateAction<Consumption[]>>;
  consumptionList: Consumption[];
};

const DiaryTile: FunctionComponent<Props> = ({
  date,
  setConsumptionList,
  consumptionList,
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "DiaryPage" });

  const { account } = useAccount();
  const [loading, setLoading] = useState(true);

  const [dialogActive, setDialogActive] = useState({
    active: false,
    meal: Meal.LUNCH,
  });

  const quitDialog = () => {
    setDialogActive({
      active: false,
      meal: Meal.LUNCH,
    });
  };

  const addConsumable = (cons: Consumable) => {
    addConsumption({
      consumable: cons,
      idUser: account.token,
      last_update: new Date(),
      consumed_on: date,
      proportion: 1,
      meal: dialogActive.meal,
    }).then((response) => {
      if (response.success) {
        setLoading(false);
        setConsumptionList([
          ...consumptionList,
          {
            idConsumption: response.idConsumption,
            consumable: cons,
            idUser: account.token,
            last_update: new Date(),
            consumed_on: date,
            proportion: 1,
            meal: dialogActive.meal,
          },
        ]);
      }
    });
  };

  const handleChangeProportion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConsumptionList(
      consumptionList.map((cons) => {
        if (cons.idConsumption === Number(e.target.name)) {
          return {
            ...cons,
            proportion: Number(e.target.value),
          };
        }
        return cons;
      })
    );
  };

  const handleBlurSaveConsumption = (cons: Consumption) => {
    changeConsumption(cons);
  };

  const handleRemoveConsumption = (idConsumption: number | undefined) => {
    setConsumptionList(
      consumptionList.filter((cons) => cons.idConsumption !== idConsumption)
    );
    if (idConsumption) removeConsumption(idConsumption);
  };

  const consumptionListNode = (meal: Meal) => {
    return (
      consumptionList &&
      consumptionList
        .filter((cons) => {
          return cons.meal === meal;
        })
        .map((cons) => (
          <ConsumableQuantityCard
            idCons={cons.idConsumption ?? -1}
            name={cons.consumable.name}
            proportion={cons.proportion}
            quantity_label={cons.consumable.quantity_label}
            consumableEnergy={cons.consumable.energy.value}
            handleChangeProportion={handleChangeProportion}
            handleBlurSaveConsumption={() => {
              handleBlurSaveConsumption(cons);
            }}
            handleRemoveConsumption={() =>
              handleRemoveConsumption(cons.idConsumption)
            }
          />
        ))
    );
  };

  useEffect(() => {
    setLoading(true);
    consumptionListAtDate(date).then((res) => {
      setConsumptionList(res);
      setLoading(false);
    });
  }, [date, setConsumptionList]);

  return (
    <div className="diary_tile">
      <div className="tile_title text-left">{t("DiaryTileTitle")}</div>
      <div className=" bg-neutral-700 text-left font-inter text-white text-xl px-2 py-4 font-semibold">
        {t("Breakfast")}
      </div>
      {loading ? (
        <div className="w-full flex items-center justify-center my-6">
          <Loader />
        </div>
      ) : (
        consumptionListNode(Meal.BREAKFAST)
      )}
      <div className="mx-6">
        <Button
          name="+"
          inverted
          onClick={() => {
            setDialogActive({
              active: true,
              meal: Meal.BREAKFAST,
            });
          }}
          textSize="text-xl"
        />
      </div>

      <div className=" bg-neutral-700 text-left mt-4 font-inter text-white text-xl px-2 py-4 font-semibold">
        {t("Lunch")}
      </div>
      {loading ? (
        <div className="w-full flex items-center justify-center my-6">
          <Loader />
        </div>
      ) : (
        consumptionListNode(Meal.LUNCH)
      )}
      <div className="mx-6">
        <Button
          name="+"
          inverted
          onClick={() => {
            setDialogActive({
              active: true,
              meal: Meal.LUNCH,
            });
          }}
          textSize="text-xl"
        />
      </div>

      <div className=" bg-neutral-700 text-left mt-4 font-inter text-white text-xl px-2 py-4 font-semibold">
        {t("Dinner")}
      </div>
      {loading ? (
        <div className="w-full flex items-center justify-center my-6">
          <Loader />
        </div>
      ) : (
        consumptionListNode(Meal.DINNER)
      )}
      <div className="mx-6">
        <Button
          name="+"
          inverted
          onClick={() => {
            setDialogActive({
              active: true,
              meal: Meal.DINNER,
            });
          }}
          textSize="text-xl"
        />
      </div>

      <div className=" bg-neutral-700 text-left mt-4 font-inter text-white text-xl px-2 py-4 font-semibold">
        {t("Snacks")}
      </div>
      {loading ? (
        <div className="w-full flex items-center justify-center my-6">
          <Loader />
        </div>
      ) : (
        consumptionListNode(Meal.SNACKS)
      )}
      <div className="mx-6">
        <Button
          name="+"
          inverted
          onClick={() => {
            setDialogActive({
              active: true,
              meal: Meal.SNACKS,
            });
          }}
          textSize="text-xl"
        />
      </div>

      <SearchConsumableDialog
        active={dialogActive.active}
        quitDialog={quitDialog}
        addToList={addConsumable}
        dialogName={t("SearchFoodDialogTitle")}
      />
    </div>
  );
};

export default DiaryTile;
