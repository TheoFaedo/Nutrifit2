import { Navigate } from "react-router-dom";
import { FunctionComponent, ReactNode } from "react";
import { AuthStatus, useAuth } from "./hooks/useAuth";
import Loader from "./components/Loader";

type Props = {
    children: ReactNode;
}

const PrivateRoute: FunctionComponent<Props> = (props) => {

  const { status } = useAuth();

  if(status === AuthStatus.LOGGED_OUT){
    return <Navigate to="/login" />;
  }else if(status === AuthStatus.LOADING){
    return (
      <>
        <div className="flex justify-center w-full h-full items-center">
          <Loader />
        </div>
      </>
    );
  }else{
    return (
      <>
        {props.children}
      </>
    );
  } 
}

export default PrivateRoute;
