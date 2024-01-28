import { FunctionComponent, memo, useState } from "react";
import Button from "../Button";
import SearchConsumableDialog from "../dialog/SearchConsumableDialog";
import { useTranslation } from "react-i18next";

const EditMealTile: FunctionComponent = memo(() => {
  const { t } = useTranslation("translation", { keyPrefix: "MealsPage" });

  const [dialogActive, setDialogActive] = useState(false);

  const quitDialog = () => {
    setDialogActive(false);
  };

  return (
    <div className="edit_meal_tile">
      <div className="tile_title text-left">{t("EditMealTileTitle")}</div>
      <div className="px-2">
        <Button
          name={t("EditMealButton")}
          inverted
          onClick={() => {
            setDialogActive(true);
          }}
        />
      </div>
      <SearchConsumableDialog
        active={dialogActive}
        quitDialog={quitDialog}
        type="edit"
        dialogName={t("SearchFoodToEditDialogTitle")}
      />
    </div>
  );
});

export default EditMealTile;
