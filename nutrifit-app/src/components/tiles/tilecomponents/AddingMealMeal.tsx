import { FunctionComponent, useEffect, useState } from "react";
import TextInput from "../../TextInput";
import MultipleDoughnutChart from "../../MultipleDoughnutChart";
import NumberInput from "../../NumberInput";
import Button from "../../Button";
import { addConsumable, changeConsumable } from "../../../services/api-service";
import {
  stringToNumberFormat,
  validConsumableName,
  validConsumableServingSize,
} from "../../../helpers/fieldHelper";
import Consumable from "../../../models/Consumable";
import { useToasts } from "../../../context/ToastContext";
import { Energy, EnergyInKcal } from "../../../models/valueObjects/Energy";
import {
  MACRO_TYPES,
  Weight,
  WeightInGrams,
} from "../../../models/valueObjects/Weight";
import barcode from "../../../img/barcode.png";
import BarcodeScannerDialog from "../../dialog/BarcodeScannerDialog";
import { useTranslation } from "react-i18next";
import { Checkbox } from "../../Checkbox";

type Field<T> = {
  value: T;
  error?: string;
  isValid?: boolean;
};

type Form = {
  name: Field<string>;
  serving_size: Field<string>;
  is_public: Field<boolean>;
  energy: Field<Energy>;
  carbos: Field<Weight>;
  fats: Field<Weight>;
  proteins: Field<Weight>;
};

const initialForm = {
  name: {
    value: "",
    error: "",
    isValid: true,
  },
  serving_size: {
    value: "",
    error: "",
    isValid: true,
  },
  is_public: {
    value: false,
    error: "",
    isValid: true,
  },
  energy: {
    value: EnergyInKcal.create(0),
    error: "",
    isValid: true,
  },
  carbos: {
    value: WeightInGrams.create(0),
    error: "",
    isValid: true,
  },
  fats: {
    value: WeightInGrams.create(0),
    error: "",
    isValid: true,
  },
  proteins: {
    value: WeightInGrams.create(0),
    error: "",
    isValid: true,
  },
};

type Props = {
  type?: "adding" | "edit";
  consumableToEdit?: Consumable;
};

const AddingMealMeal: FunctionComponent<Props> = ({
  type = "adding",
  consumableToEdit,
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "MealsPage" });
  const mt = useTranslation("translation", { keyPrefix: "Macros" }).t;
  const errort = useTranslation("translation", { keyPrefix: "Errors" }).t;

  const { pushToast } = useToasts();

  const setFormByConsumable = (consumable: Consumable) => {
    setForm({
      name: {
        value: consumable.name,
        error: "",
        isValid: true,
      },
      serving_size: {
        value: consumable.quantity_label,
        error: "",
        isValid: true,
      },
      energy: {
        value: consumable.energy,
        error: "",
        isValid: true,
      },
      is_public: {
        value: consumable.is_public,
        error: "",
        isValid: true,
      },
      carbos: {
        value: consumable.carbohydrates,
        error: "",
        isValid: true,
      },
      fats: {
        value: consumable.fats,
        error: "",
        isValid: true,
      },
      proteins: {
        value: consumable.proteins,
        error: "",
        isValid: true,
      },
    });
  };

  const beginForm =
    type === "adding"
      ? initialForm
      : {
          name: {
            value: consumableToEdit ? consumableToEdit.name : "",
            error: "",
            isValid: true,
          },
          serving_size: {
            value: consumableToEdit ? consumableToEdit.quantity_label : "",
            error: "",
            isValid: true,
          },
          is_public: {
            value: consumableToEdit ? consumableToEdit.is_public : true,
            error: "",
            isValid: true,
          },
          energy: {
            value: consumableToEdit
              ? consumableToEdit.energy
              : EnergyInKcal.create(0),
            error: "",
            isValid: true,
          },
          carbos: {
            value: consumableToEdit
              ? consumableToEdit.carbohydrates
              : WeightInGrams.create(0),
            error: "",
            isValid: true,
          },
          fats: {
            value: consumableToEdit
              ? consumableToEdit.fats
              : WeightInGrams.create(0),
            error: "",
            isValid: true,
          },
          proteins: {
            value: consumableToEdit
              ? consumableToEdit.proteins
              : WeightInGrams.create(0),
            error: "",
            isValid: true,
          },
        };

  const [form, setForm] = useState<Form>({ ...beginForm });
  const [barCodeActive, setBarCodeActive] = useState<boolean>(false);

  const handleBarCodeScan = (data: any) => {
    if (!data) return;

    setForm({
      ...form,
      name: {
        value: data.name.substring(0, 30),
        error: "",
        isValid: true,
      },
      serving_size: {
        value: "100g",
        error: "",
        isValid: true,
      },
      energy: {
        value: EnergyInKcal.create(data["energy-kcal_100g"]),
        error: "",
        isValid: true,
      },
      carbos: {
        value: WeightInGrams.create(data["carbohydrates_100g"]),
        error: "",
        isValid: true,
      },
      fats: {
        value: WeightInGrams.create(data["fat_100g"]),
        error: "",
        isValid: true,
      },
      proteins: {
        value: WeightInGrams.create(data["proteins_100g"]),
        error: "",
        isValid: true,
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = name === "is_public" ? e.target.checked : e.target.value;

    setForm({
      ...form,
      [name]: {
        value,
        error: "",
        isValid: true,
      },
    });
  };

  const handleChangeNutVal = (e: any) => {
    const name = e.target.name;
    const value = stringToNumberFormat(e.target.value);

    let updatedEnergy = form.energy.value;
    let updatedCarbos = form.carbos.value;
    let updatedFats = form.fats.value;
    let updatedProteins = form.proteins.value;

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
      energy: {
        ...form.energy,
        value: EnergyInKcal.create(Math.round(updatedEnergy.value * 10) / 10),
      },
      carbos: {
        ...form.carbos,
        value: WeightInGrams.create(Math.round(updatedCarbos.value * 10) / 10),
      },
      fats: {
        ...form.fats,
        value: WeightInGrams.create(Math.round(updatedFats.value * 10) / 10),
      },
      proteins: {
        ...form.proteins,
        value: WeightInGrams.create(
          Math.round(updatedProteins.value * 10) / 10
        ),
      },
    });
  };

  const validateForm = () => {
    let newForm: Form = form;

    let status = validConsumableName(newForm.name.value)
    if (status.valid) {
      const newField = { value: newForm.name.value, error: "", isValid: true };
      newForm = { ...newForm, name: newField };
    } else {
      const newField = {
        value: newForm.name.value,
        error: errort("Error"+status.messageId),
        isValid: false,
      };
      newForm = { ...newForm, name: newField };
    }

    status = validConsumableServingSize(newForm.serving_size.value)
    if (status.valid) {
      const newField = {
        value: newForm.serving_size.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, serving_size: newField };
    } else {
      const newField = {
        value: newForm.serving_size.value,
        error: errort("Error"+status.messageId),
        isValid: false,
      };
      newForm = { ...newForm, serving_size: newField };
    }

    setForm(newForm);
    return newForm.name.isValid && newForm.serving_size.isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      pushToast({ type: "error", content: t("InformationInvalidFormatToast") });
      return;
    }

    const consumable = {
      name: form.name.value,
      quantity_label: form.serving_size.value,
      energy: form.energy.value,
      carbohydrates: form.carbos.value,
      fats: form.fats.value,
      proteins: form.proteins.value,
      type: "MEAL",
      is_public: form.is_public.value,
      ingredients: [],
    };

    if (type === "adding") {
      addConsumable(consumable)
        .then((res) => {
          if (res.success)
            pushToast({ content: t("MealAddedSuccesfullyToast") });
          else pushToast({ content: t("MealFailedToAddToast"), type: "error" });
        })
        .catch((err) => {
          console.log(err);
        });

      setForm({ ...initialForm });
    } else {
      changeConsumable({
        ...consumable,
        idConsumable: consumableToEdit?.idConsumable,
      })
        .then((res) => {
          if (res.success) pushToast({ content: "Edited successfully" });
          else pushToast({ content: "Failed to edit", type: "error" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (consumableToEdit) setFormByConsumable(consumableToEdit);
  }, [consumableToEdit]);

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label
        className="mt-4 text-white font-inter font-medium text-sm text-left"
        htmlFor="name"
      >
        {t("NameFieldTitle")} :
      </label>
      <TextInput
        name="name"
        placeholder={t("NameFieldPlaceholder")}
        value={form.name.value}
        onChange={handleChange}
        errorBorder={!form.name.isValid}
        errorMessage={form.name.error}
      />
      <label
        className="mt-2 text-white font-inter font-medium text-sm text-left"
        htmlFor="serving_size"
      >
        {t("ServingSizeFieldTitle")} :
      </label>
      <div className="flex items-start">
        <TextInput
            name="serving_size"
            placeholder={t("ServingSizeFieldPlaceholder")}
            value={form.serving_size.value}
            onChange={handleChange}
            errorBorder={!form.serving_size.isValid}
            errorMessage={form.serving_size.error}
          />
        <Checkbox name="is_public" label={t("IsPublicFieldTitle")} checked={form.is_public.value} onChange={handleChange} />
      </div>
      <div className="w-full flex items-center justify-center mt-4">
        <MultipleDoughnutChart
          nutriData={{
            carbos: form.carbos.value.toKcal(MACRO_TYPES.CARBOHYDRATE),
            fats: form.fats.value.toKcal(MACRO_TYPES.FAT),
            proteins: form.proteins.value.toKcal(MACRO_TYPES.PROTEIN),
            energy: form.energy.value,
            energy_unit: "kcal",
          }}
          className="w-32 h-32"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4 px-4">
        <div className="text-white grid grid-cols-2">
          <div className="text-left text-white font-medium text-sm flex items-center">
            <span className="dot" style={{ backgroundColor: "#FFFFFF" }}></span>
            <label htmlFor="energy">{mt("Energy")} (kcal)</label>
          </div>
          <NumberInput
            name="energy"
            placeholder="kcal"
            value={form.energy.value.value}
            styleWidth="w-full"
            rightAlign
            maxlength={5}
            decimalLength={1}
            onChange={handleChangeNutVal}
          />
        </div>
        <div className="text-white grid grid-cols-2">
          <div className="text-left text-white font-medium text-sm flex items-center">
            <span className="dot" style={{ backgroundColor: "#38D386" }}></span>
            <label htmlFor="energy">{mt("Carbohydrates")} (g)</label>
          </div>
          <NumberInput
            name="carbos"
            placeholder="g"
            value={form.carbos.value.value}
            styleWidth="w-full"
            rightAlign
            decimalLength={1}
            onChange={handleChangeNutVal}
          />
        </div>
        <div className="text-white grid grid-cols-2">
          <div className="text-left text-white font-medium text-sm flex items-center">
            <span className="dot" style={{ backgroundColor: "#CC57F5" }}></span>
            <label htmlFor="energy">{mt("Fats")} (g)</label>
          </div>
          <NumberInput
            name="fats"
            placeholder="g"
            value={form.fats.value.value}
            styleWidth="w-full"
            rightAlign
            decimalLength={1}
            onChange={handleChangeNutVal}
          />
        </div>
        <div className="text-white grid grid-cols-2">
          <div className="text-left text-white font-medium text-sm flex items-center">
            <span className="dot" style={{ backgroundColor: "#EEBD30" }}></span>
            <label htmlFor="energy">{mt("Proteins")} (g)</label>
          </div>
          <NumberInput
            name="proteins"
            placeholder="g"
            value={form.proteins.value.value}
            styleWidth="w-full"
            rightAlign
            decimalLength={1}
            
            onChange={handleChangeNutVal}
          />
        </div>
      </div>
      <div className="px-3">
        <button
          className="button-inverted flex justify-center items-center text-center flex-col"
          onClick={(e) => {
            e.preventDefault();
            setBarCodeActive(true);
          }}
        >
          <img
            className="w-14 h-14 mt-2"
            src={barcode}
            alt="barcode scanning icon"
          />
          <div className="mt-2 font-inter font-medium text-md">
            {t("ScanBarcodeButton")}
          </div>
        </button>
      </div>
      {type === "adding" ? (
        <Button name={t("AddMealButton")} submit />
      ) : (
        <Button name={t("SaveMealButton")} submit />
      )}
      {barCodeActive ? (
        <BarcodeScannerDialog
          quitDialog={(res: any) => {
            setBarCodeActive(false);
            handleBarCodeScan(res);
          }}
        />
      ) : (
        <></>
      )}
    </form>
  );
};

export default AddingMealMeal;
