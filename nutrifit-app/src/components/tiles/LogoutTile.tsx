
import { FunctionComponent } from 'react';
import Button from '../Button';
import AuthenticationService from "../../services/authentication-service";
import { logout } from "../../services/api-service";
import { useNavigate } from "react-router-dom";


const LogoutTile: FunctionComponent = () => {

    const navigate = useNavigate();

    const logoutHandler = () => {
        logout().then((res) => {
            if(res.success){
                AuthenticationService.logout();
                navigate("/");
            } 
        })
    }

    return (
        <div className='bg-neutral-800  my-6 mx-4 rounded-lg p-4 text-white'>
            <div>You are logged as <span className="font-bold">user</span></div>
            <Button name="Logout" onClick={logoutHandler}/>
        </div>
    );
}

export default LogoutTile;