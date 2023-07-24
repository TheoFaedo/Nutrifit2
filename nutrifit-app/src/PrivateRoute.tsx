import { Navigate } from 'react-router-dom';
import AuthenticationService from './services/authentication-service';
  
const PrivateRoute = ({ component: Component, ...rest }: any) => {
    const isAuthenticated = AuthenticationService.isAuthenticated;
    if (!isAuthenticated) {    
        return <Navigate to={{ pathname: '/login' }} />
    }
    return Component;
};

export default PrivateRoute;