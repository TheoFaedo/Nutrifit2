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
import { ProgressBar } from "../ProgressBar";

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
    <div className="logout_tile mb-4">
      <div>
      <div className="w-full flex justify-center mb-2">
        <img src={profileImg} alt="Profile" className="w-24 h-24 rounded-full shadow-sm"/>
      </div>

      <output className="block">
        <b>{account.username}</b>
      </output>
      </div>

      <div className="w-full flex justify-center items-center mt-2 mb-4 font-inter font-medium">
        1
        <div className="w-28 mx-2">
          <ProgressBar progress={0.5} height="h-1.5" />
        </div>
        2
      </div>
      
      <div className="w-full text-left">
        <label htmlFor="languageSelector" className="text-white text-sm">{t('SelectLanguage')}</label>
        <Select
          values={[{label: 'English', value: 'en'}, {label: 'Français', value: 'fr'}]}
          selectedValue={i18next.language} 
          onChange={(e: any) => {
            updateProfile({lang: e.target.value}).then((res) => {
              if(res.success){
                i18next.changeLanguage(e.target.value);
              }
            });
          }}
        />
      </div>

      <Button name={t('LogoutButton')} onClick={logoutHandler} />
    </div>
  );
});

export default LogoutTile;
