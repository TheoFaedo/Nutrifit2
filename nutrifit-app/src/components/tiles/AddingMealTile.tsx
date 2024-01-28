import { FunctionComponent, useState } from "react";
import SelectorButton from "../SelectorButton";
import AddingMealMeal from "./tilecomponents/AddingMealMeal";
import AddingMealRecipe from "./tilecomponents/AddingMealRecipe";
import { useTranslation } from "react-i18next";

const AddingMealTile: FunctionComponent = () => {
  const { t } = useTranslation("translation", { keyPrefix: "MealsPage" });

  const [active, setActive] = useState(0);

  const selectorHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    setActive(index);
  };

  return (
    <div className="adding_meal_tile">
      <div className="tile_title text-left">{t("AddingMealTileTitle")}</div>
      <SelectorButton
        names={[t("MealSelectButton"), t("RecipeSelectButton")]}
        active={active}
        onClick={selectorHandler}
      />
      {active === 0 ? <AddingMealMeal /> : <AddingMealRecipe />}
    </div>
  );
};

export default AddingMealTile;
