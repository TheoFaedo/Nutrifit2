import { FunctionComponent, useState } from "react";
import Button from "./../components/Button";
import TextInput from "../components/TextInput";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import Select from "../components/Select";
import i18next from "i18next";
import { NutrifitError } from "../errors/Errors";

type Field = {
  value?: any;
  error?: string;
  isValid?: boolean;
};

type Form = {
  username: Field;
  password: Field;
};

const Login: FunctionComponent = () => {
  const { t } = useTranslation("translation", { keyPrefix: "LoginPage" });
  const { t: t2 } = useTranslation("translation");
  const { t: errort } = useTranslation("translation", { keyPrefix: "Errors" });

  const authState = useAuth();

  const [errorMessage, setErrorMessage] = useState<number>(-1);

  const [form, setForm] = useState<Form>({
    username: {
      value: "",
    },
    password: {
      value: "",
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue } };

    setForm({ ...form, ...newField });
    setErrorMessage(-1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (authState.status !== 1) {
      return;
    }
    authState
      .login(form.username.value, form.password.value)
      .then((data: any) => {
        if (data && data.error) {
          setErrorMessage(data.error.messageId);
        } else {
        }
      })
      .catch((err: NutrifitError) => {
        setErrorMessage(err.messageId);
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
            {t("UsernameFieldTitle")} :
          </label>
          <TextInput
            value={form.username.value}
            name="username"
            placeholder={t("UsernameFieldPlaceholder")}
            onChange={handleInputChange}
            errorBorder={form.username.isValid}
          />
          <label className="mt-2 text-left" htmlFor="password">
            {t("PasswordFieldTitle")} :
          </label>
          <TextInput
            value={form.password.value}
            password
            name="password"
            placeholder={t("PasswordFieldPlaceholder")}
            onChange={handleInputChange}
            errorBorder={form.password.isValid}
          />
          <div className="error-message">
            {errorMessage === -1 ? "" : errort("Error" + errorMessage)}
          </div>
          <Button name={t("LoginButton")} submit />
          <div className="mt-4 font-normal">
            {t("NoAccount?")}{" "}
            <Link className="text-secondary underline" to="/register">
              {t("RegisterHereLink")}
            </Link>
          </div>
        </form>
      </div>
      <div className="w-full my-2 flex flex-col items-center">
        <div className="w-1/2">
          <label
            className="text-white font-inter font-sm font-medium"
            htmlFor="languageSelector"
          >
            {t2("ProfilePage.SelectLanguage")}
          </label>
          <Select
            values={[
              { label: "English", value: "en" },
              { label: "Français", value: "fr" },
            ]}
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

export default Login;
