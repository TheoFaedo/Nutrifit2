import { FunctionComponent } from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAccount } from "../../hooks/useAccount";
import { useTranslation } from "react-i18next";
import Select from "../Select";
import i18next from "i18next";
import { updateProfile } from "../../services/api-service";
import profileImg from "../../img/default_profile.png"
import { ProgressBar } from "../ProgressBar";

const LogoutTile: FunctionComponent = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { account } = useAccount();

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  const { t } = useTranslation("translation", { keyPrefix: "ProfilePage" });

  return (
    <div className="logout_tile mb-4">
      <div>
      <div className="w-full flex justify-center">
        <img src={(!account.pp || account.pp === "" ) ? profileImg : process.env.REACT_APP_API_URI + account.pp} alt="Profile" className="w-24 h-24 rounded-full shadow-sm"/>
      </div>

      <div className="w-full flex justify-center items-center mt-2 b-1 font-inter font-medium">
        {account.level}
        <div className="w-28 mx-2">
          <ProgressBar progress={account.exp / 50} height="h-1.5" />
        </div>
        {account.level+1}
      </div>

      <output className="block font-semibold text-lg text-center">
        {account.username}
      </output>
      </div>
      
      <div className="w-full text-left pt-4 mt-4 border-t-2 border-neutral-700">
        <label htmlFor="languageSelector" className="text-white text-sm">{t('SelectLanguage')}</label>
        <Select
          values={[{label: 'English', value: 'en'}, {label: 'Français', value: 'fr'}]}
          selectedValue={i18next.language} 
          onChange={(e: any) => {
            updateProfile({lang: e.target.value}).then((res) => {
              if(res.success){
                i18next.changeLanguage(res.lang);
              }
            });
          }}
        />
      </div>

      <Button name={t('LogoutButton')} onClick={logoutHandler} />
    </div>
  );
};

export default LogoutTile;
