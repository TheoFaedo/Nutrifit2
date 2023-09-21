
import { FunctionComponent, useState } from 'react';
import Button from '../Button';
import SearchConsumableDialog from '../dialog/SearchConsumableDialog';



const EditMealTile : FunctionComponent = () => {

    const [dialogActive, setDialogActive] = useState(false);

    const quitDialog = () => {
        setDialogActive(false);
    }

    return (
        <div className='bg-neutral-800 my-6 mx-4 rounded-lg p-4 flex flex-col font-inter'>
            <div className="tile_title text-left">Edit meal</div>
            <div className="px-2"><Button name="Edit meal" inverted onClick={() => {setDialogActive(true)}}/></div>
            <SearchConsumableDialog active={dialogActive} quitDialog={quitDialog} type="edit"/>
        </div>
    );
}

export default EditMealTile;