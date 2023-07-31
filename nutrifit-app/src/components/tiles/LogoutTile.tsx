
import { FunctionComponent, useContext } from 'react';
import Button from '../Button';
import { logout } from "../../services/api-service";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext';


const LogoutTile: FunctionComponent = () => {

    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    const logoutHandler = () => {
        logout().then((res) => {
            if(res.success){
                userContext.logoutContext();
                navigate("/");
            } 
        })
    }

    return (
        <div className='bg-neutral-800  my-6 mx-4 rounded-lg p-4 text-white'>
            <div>You are logged as <span className="font-bold">{userContext.pseudo}</span></div>
            <Button name="Logout" onClick={logoutHandler}/>
        </div>
    );
}

export default LogoutTile;