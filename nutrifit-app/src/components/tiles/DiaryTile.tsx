import { FunctionComponent, useCallback, useEffect, useState } from "react";
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
  setConsumptionList: Function;
  consumptionList: Consumption[];
  setCanConfirmGoal: Function;
  locked: boolean;
  setLocked: Function;
}

const DiaryTile: FunctionComponent<Props> = ({ date, setConsumptionList, consumptionList, setCanConfirmGoal, locked, setLocked }) => {
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
        setCanConfirmGoal(response.canConfirm);
      }
    });
  };

  const handleChangeProportion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setConsumptionList(
      consumptionList.map((cons) => {
        if (cons.idConsumption === Number(e.target.name)) {
          return {
            ...cons,
            proportion: isNaN(value) ? 0 : value,
          };
        }
        return cons;
      })
    );
  };

  const handleBlurSaveConsumption = (cons: Consumption) => {
    if(cons.idConsumption){
      changeConsumption(cons.idConsumption??0, cons.proportion).then((response) => {
        if(response.success){
          setCanConfirmGoal(response.canConfirm);
        }
      });
    }
  }

  const handleRemoveConsumption = (idConsumption: number | undefined) => {
    setConsumptionList(
      consumptionList.filter((cons) => cons.idConsumption !== idConsumption)
    );
    if (idConsumption) removeConsumption(idConsumption).then((response) => {
      if (response.success) {
        setCanConfirmGoal(response.canConfirm);
      }
    });
  };

  const consumptionListNode = (meal: Meal) => {
    return (
      consumptionList &&
      consumptionList
        .filter((cons) => {
          return cons.meal === meal;
        })
        .map((cons) => {
          return <ConsumableQuantityCard
            key={cons.idConsumption}
            idCons={cons.idConsumption ?? -1}
            name={cons.consumable.name}
            proportion={cons.proportion}
            quantity_label={cons.consumable.quantity_label}
            consumableEnergy={cons.consumable.energy.value}
            handleChangeProportion={handleChangeProportion}
            handleBlurSaveConsumption={() => handleBlurSaveConsumption(cons)}
            handleRemoveConsumption={() =>
              handleRemoveConsumption(cons.idConsumption)
            }
            locked={locked}
          />
  })
    );
  };

  useEffect(() => {
    consumptionListAtDate(date).then(handleChangeList);
  }, [date, setConsumptionList, setCanConfirmGoal, setLocked]);

  const handleChangeList = useCallback((res: any) => {
    setCanConfirmGoal(res.canConfirmGoal);
    setConsumptionList(res.consumptionList);
    setLocked(res.locked);
    setLoading(false);
  }, [setCanConfirmGoal, setConsumptionList, setLocked]); 

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
      {!locked && <div className="mx-6">
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
      </div>}

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
      {!locked && <div className="mx-6">
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
      </div>}

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
      {!locked && <div className="mx-6">
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
      </div>}

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
      {!locked && <div className="mx-6">
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
      </div>}

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
