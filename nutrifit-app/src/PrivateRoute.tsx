import { Navigate } from "react-router-dom";
import { FunctionComponent, ReactNode, useContext } from "react";
import { UserContext } from "./context/UserContext";

type Props = {
    children: ReactNode;
}

const PrivateRoute: FunctionComponent<Props> = (props) => {

  const userContext = useContext(UserContext);

  if(!userContext.loggedIn){
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
