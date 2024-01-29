import { FunctionComponent, memo } from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAccount } from "../../hooks/useAccount";
import { useTranslation } from "react-i18next";

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
      <output>
        {t("You are logged as")} <b>{account.username}</b>
      </output>
      <Button name={t('LogoutButton')} onClick={logoutHandler} />
    </div>
  );
});

export default LogoutTile;
