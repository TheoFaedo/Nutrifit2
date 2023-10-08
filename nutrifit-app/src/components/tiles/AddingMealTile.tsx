
import { FunctionComponent, useState } from 'react';
import SelectorButton from '../SelectorButton';
import AddingMealMeal from './tilecomponents/AddingMealMeal';
import AddingMealRecipe from './tilecomponents/AddingMealRecipe';



const AddingMealTile: FunctionComponent = () => {

    const [active, setActive] = useState(0);

    const selectorHandler = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        setActive(index);
    }

    return (
        <div className='adding_meal_tile'>
            <div className="tile_title text-left">Adding meal</div>
            <SelectorButton names={['Meal', 'Recipe']} active={active} onClick={selectorHandler}/>
            {
                active === 0 ? <AddingMealMeal/> : <AddingMealRecipe/>
            }
        </div>
    );
}

export default AddingMealTile;