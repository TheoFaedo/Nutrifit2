import React, { FunctionComponent, useState } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import SelectorButton from "../components/SelectorButton";
import TiledSelectorButton from "../components/TiledSelectorButton";
import { register } from "../services/api-service";
import {
  validEmail,
  validGender,
  validGoal,
  validPassword,
  validUsername,
} from "../helpers/fieldHelper";
import { useToasts } from "../context/ToastContext";
import Mail from "../models/valueObjects/Mail";
import { useTranslation } from "react-i18next";
import Select from "../components/Select";
import i18next from "i18next";

type Field = {
  value?: any;
  error?: number;
  isValid?: boolean;
};

type Form = {
  username: Field;
  password: Field;
  passwordConfirm: Field;
  mail: Field;
  gender: Field;
  goal: Field;
};

const Register: FunctionComponent = () => {
  const { t } = useTranslation("translation", { keyPrefix: "RegisterPage" });
  const { t: t2 } = useTranslation("translation");
  const { t: errort } = useTranslation("translation", { keyPrefix: "Errors" });

  const { pushToast } = useToasts();

  const navigate = useNavigate();

  const [form, setForm] = useState<Form>({
    username: {
      value: "",
      error: 0,
      isValid: true,
    },
    password: {
      value: "",
      error: 0,
      isValid: true,
    },
    passwordConfirm: {
      value: "",
      error: 0,
      isValid: true,
    },
    mail: {
      value: "",
      error: 0,
      isValid: true,
    },
    gender: {
      value: 0,
      error: 0,
      isValid: true,
    },
    goal: {
      value: 0,
      error: 0,
      isValid: true,
    },
  });

  const [errorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = {
      [fieldName]: { value: fieldValue, error: "", isValid: true },
    };

    setForm({ ...form, ...newField });
  };

  const handleGenderChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    setForm({
      ...form,
      gender: {
        value: index,
        error: 0,
        isValid: true,
      },
    });
  };

  const handleGoalChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    setForm({
      ...form,
      goal: {
        value: index,
        error: 0,
        isValid: true,
      },
    });
  };

  const validateForm = (): boolean => {
    let newForm: Form = form;

    let status = validUsername(newForm.username.value);
    if (status.valid) {
      const newField = {
        value: newForm.username.value,
        error: 0,
        isValid: true,
      };
      newForm = { ...newForm, username: newField };
    } else {
      const newField = {
        value: newForm.username.value,
        error: status.message,
        isValid: false,
      };
      newForm = { ...newForm, username: newField };
    }

    status = validGender(newForm.gender.value === 0 ? "M" : "F")
    if (status.valid) {
      const newField = {
        value: newForm.gender.value,
        error: 0,
        isValid: true,
      };
      newForm = { ...newForm, gender: newField };
    } else {
      const newField = {
        value: newForm.gender.value,
        error: status.message,
        isValid: false,
      };
      newForm = { ...newForm, gender: newField };
    }

    status = validPassword(newForm.password.value);
    if (status.valid) {
      const newField = {
        value: newForm.password.value,
        error: 0,
        isValid: true,
      };
      newForm = { ...newForm, password: newField };
    } else {
      const newField = {
        value: newForm.password.value,
        error: status.message,
        isValid: false,
      };
      newForm = { ...newForm, password: newField };
    }

    if (newForm.password.value === newForm.passwordConfirm.value) {
      const newField = {
        value: newForm.passwordConfirm.value,
        error: 0,
        isValid: true,
      };
      newForm = { ...newForm, passwordConfirm: newField };
    } else {
      const newField = {
        value: newForm.passwordConfirm.value,
        error: status.message,
        isValid: false,
      };
      newForm = { ...newForm, passwordConfirm: newField };
    }

    status = validEmail(newForm.mail.value)
    if (status.valid) {
      const newField = { value: newForm.mail.value, error: 0, isValid: true };
      newForm = { ...newForm, mail: newField };
    } else {
      const newField = {
        value: newForm.mail.value,
        error: status.message,
        isValid: false,
      };
      newForm = { ...newForm, mail: newField };
    }

    status = validGoal(newForm.goal.value + 1)
    if (status.valid) {
      const newField = { value: newForm.goal.value, error: 0, isValid: true };
      newForm = { ...newForm, goal: newField };
    } else {
      const newField = {
        value: newForm.goal.value,
        error: status.message,
        isValid: false,
      };
      newForm = { ...newForm, goal: newField };
    }

    setForm(newForm);
    return newForm.username.isValid &&
      newForm.password.isValid &&
      newForm.passwordConfirm.isValid &&
      newForm.mail.isValid &&
      newForm.gender.isValid &&
      newForm.goal.isValid
      ? true
      : false;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userToRegister = {
      pseudo: form.username.value,
      password: form.password.value,
      mail: Mail.create(form.mail.value),
      gender: form.gender.value === 0 ? "M" : "F",
      goal: form.goal.value + 1,
    };

    register(userToRegister).then((response) => {
      if ("success" in response) {
        pushToast({
          type: "success",
          content: "Account created successfully",
        });
        navigate("/login");
      } else if ("errors" in response) {

        const newForm = structuredClone(form);

        Object.keys(response.errors).forEach((key) => {
          const formKey = key as keyof Form;

          newForm[formKey].error = response.errors[key].messageId;
          newForm[formKey].isValid = false;
        })

        setForm(newForm);
      }
    });
  };

  return (
    <>
      <div className="min-h-48 bg-neutral-800 my-6 mx-4 rounded-lg p-4 text-white">
        <h2 className="text-2xl mb-2 mt-1 ml-3 font-inter font-bold">
          {t("TileTitle")}
        </h2>
        <form
          className="flex flex-col font-inter font-medium text-sm"
          onSubmit={handleSubmit}
        >
          <label className="mt-2 text-left" htmlFor="username">
            {t("UsernameFieldLabel")} :
          </label>
          <TextInput
            value={form.username.value}
            name="username"
            placeholder={t("UsernameFieldPlaceholder")}
            onChange={handleInputChange}
            errorBorder={!form.username.isValid}
            errorMessage={form.username.isValid ? '' : errort('Error'+form.username.error)}
          />

          <label className="mt-2 text-left" htmlFor="password">
            {t("GenderFieldLabel")} :
          </label>
          <SelectorButton
            names={[t("MaleSelectButton"), t("FemaleSelectButton")]}
            active={form.gender.value}
            onClick={handleGenderChange}
          />

          <label className="mt-2 text-left" htmlFor="password">
            {t("PasswordFieldLabel")} :
          </label>
          <TextInput
            value={form.password.value}
            password
            name="password"
            placeholder={t("PasswordFieldPlaceholder")}
            onChange={handleInputChange}
            errorBorder={!form.password.isValid}
            errorMessage={form.password.isValid ? '' : errort('Error'+form.password.error)}
          />

          <label className="mt-2 text-left" htmlFor="passwordConfirm">
            {t("RepeatPasswordFieldLabel")} :
          </label>
          <TextInput
            value={form.passwordConfirm.value}
            password
            name="passwordConfirm"
            placeholder={t("RepeatPasswordFieldPlaceholder")}
            onChange={handleInputChange}
            errorBorder={!form.passwordConfirm.isValid}
            errorMessage={form.passwordConfirm.isValid ? '' : errort('Error'+form.passwordConfirm.error)}
          />

          <label className="mt-2 text-left" htmlFor="mail">
            {t("EmailFieldLabel")} :
          </label>
          <TextInput
            value={form.mail.value}
            name="mail"
            placeholder={t("EmailFieldPlaceholder")}
            onChange={handleInputChange}
            errorBorder={!form.mail.isValid}
            errorMessage={form.mail.isValid ? '' : errort('Error'+form.mail.error)}
          />

          <label className="mt-2 text-left" htmlFor="password">
            {t("GoalFieldLabel")} :
          </label>
          <TiledSelectorButton
            names={[
              t("LoseGoalSelectButton"),
              t("MaintainGoalSelectButton"),
              t("GainGoalSelectButton"),
            ]}
            active={form.goal.value}
            onClick={handleGoalChange}
          />

          <div className="mt-6">
            <div className="error-message">{errorMessage}</div>
          </div>

          <Button name={t("Button")} submit />
          <div className="mt-4 font-normal">
            {t('HaveAccount?') + " "}
            <Link className="text-secondary underline" to="/login">
              {t("LoginHereLink")}
            </Link>
          </div>
        </form>
      </div>
      <div className="w-full my-2 flex flex-col items-center">
        <div className="w-1/2 p-2">
          <label className="text-white font-inter font-sm font-medium" htmlFor='languageSelector'>{t2('ProfilePage.SelectLanguage')}</label>
          <Select 
            values={[{label: 'English', value: 'en'}, {label: 'Français', value: 'fr'}]}
            selectedValue={i18next.language} 
            onChange={(e: any) => {
              i18next.changeLanguage(e.target.value);
            }}
          />
       </div>
      </div>
    </>
    
  );
};

export default Register;
