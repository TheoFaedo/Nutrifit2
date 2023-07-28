import { Navigate } from "react-router-dom";
import AuthenticationService from "./services/authentication-service";
import { FunctionComponent, ReactNode } from "react";

type Props = {
    children: ReactNode;
}

const PrivateRoute: FunctionComponent<Props> = (props) => {
  if(!AuthenticationService.isAuthenticated){
    return <Navigate to="/login" />;
  }else{
    return (
      <>
        {props.children}
      </>
    );
  } 
}

export default PrivateRoute;
