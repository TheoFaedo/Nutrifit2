
import { FunctionComponent, useState } from 'react';
import SelectorButton from '../SelectorButton';
import AddingMealMeal from './tilecomponents/AddingMealMeal';
import AddingMealRecipe from './tilecomponents/AddingMealRecipe';



const AddingMeal: FunctionComponent = () => {

    const [active, setActive] = useState(0);

    const selectorHandler = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        setActive(index);
    }

    return (
        <div className='bg-neutral-800 my-6 mx-4 rounded-lg p-4 flex flex-col font-inter'>
            <div className="tile_title text-left">Adding meal</div>
            <SelectorButton names={['Meal', 'Recipe']} active={active} onClick={selectorHandler}/>
            {
                active === 0 ? <AddingMealMeal/> : <AddingMealRecipe/>
            }
        </div>
    );
}

export default AddingMeal;