
import { FunctionComponent, memo, useState } from 'react';
import Button from '../Button';
import SearchConsumableDialog from '../dialog/SearchConsumableDialog';



const EditMealTile : FunctionComponent = memo(() => {

    const [dialogActive, setDialogActive] = useState(false);

    const quitDialog = () => {
        setDialogActive(false);
    }

    return (
        <div className='edit_meal_tile'>
            <div className="tile_title text-left">Edit meal</div>
            <div className="px-2"><Button name="Edit meal" inverted onClick={() => {setDialogActive(true)}}/></div>
            <SearchConsumableDialog active={dialogActive} quitDialog={quitDialog} type="edit" dialogName='Search meal to edit'/>
        </div>
    );
});

export default EditMealTile;