
import { FunctionComponent, memo } from 'react';
import Button from '../Button';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import { useAccount } from '../../hooks/useAccount';


const LogoutTile: FunctionComponent = memo(() => {

    const navigate = useNavigate();
    const { logout } = useAuth();
    const { account } = useAccount();

    const logoutHandler = () => {
        logout();
        navigate("/login");
    }

    return (
        <div className='logout_tile'>
            <output>You are logged as <b>{account.username}</b></output>
            <Button name="Logout" onClick={logoutHandler}/>
        </div>
    );
});

export default LogoutTile;