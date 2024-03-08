import { FunctionComponent, useContext, useEffect, useState } from "react";
import Button from "./../components/Button";
import TextInput from "../components/TextInput";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavBarContext } from "../context/NavBarContext";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import Select from "../components/Select";
import i18next from "i18next";

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

  const { hideNavBar } = useContext(NavBarContext);
  const { login } = useAuth();

  useEffect(() => {
    hideNavBar();
  }, [hideNavBar]);

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

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
    setErrorMessage("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    login(form.username.value, form.password.value)
      .then((data: any) => {
        if (data && data.error) {
          setErrorMessage(data.error);
        } else {
          navigate("/profile");
        }
      })
      .catch((err: Error) => {
        console.error(err.message);
        setErrorMessage(err.message);
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
          <div className="error-message">{errorMessage}</div>
          <Button name={t('LoginButton')} submit />
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
          <label className="text-white font-inter font-sm font-medium" htmlFor='languageSelector'>{t2('ProfilePage.SelectLanguage')}</label>
          <Select 
            name='languageSelector'
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

export default Login;
