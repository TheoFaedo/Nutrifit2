import { FunctionComponent, memo } from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAccount } from "../../hooks/useAccount";
import { useTranslation } from "react-i18next";
import Select from "../Select";
import i18next from "i18next";
import { updateProfile } from "../../services/api-service";
import profileImg from "../../img/default_profile.png"

const LogoutTile: FunctionComponent = memo(() => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { account } = useAccount();

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  const { t } = useTranslation("translation", { keyPrefix: "ProfilePage" });

  return (
    <div className="logout_tile">
      <div className="w-full flex justify-center mb-2">
        <img src={profileImg} alt="Profile" className="w-24 h-24 rounded-full shadow-sm"/>
      </div>

      <output className="mb-2">
        <b>{account.username}</b>
      </output>

      <div className="w-full mb-2 text-left">
        <label htmlFor="languageSelector" className="text-white text-sm px-1">{t('SelectLanguage')}</label>
        <Select 
          name='languageSelector' 
          values={[{label: 'English', value: 'en'}, {label: 'Français', value: 'fr'}]}
          selectedValue={i18next.language} 
          onChange={(e: any) => {
            i18next.changeLanguage(e.target.value);
            updateProfile({lang: e.target.value});
          }}
        />
      </div>

      <Button name={t('LogoutButton')} onClick={logoutHandler} />
    </div>
  );
});

export default LogoutTile;
