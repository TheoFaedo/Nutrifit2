import { FunctionComponent, useContext, useEffect, useState } from 'react';
import Button from './../components/Button';
import TextInput from '../components/TextInput';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavBarContext } from '../context/NavBarContext';
import { useAuth } from '../hooks/useAuth';

type Field = {
  value?: any;
  error?: string;
  isValid?: boolean;
}

type Form = {
  username: Field;
  password: Field;
}

const Login: FunctionComponent = () => {

    const { hideNavBar } = useContext(NavBarContext);
    const { login } = useAuth();

    useEffect(() => {
      hideNavBar();
    }, [hideNavBar])

    const navigate = useNavigate();

    const [errorMessage , setErrorMessage] = useState("");

    const [form, setForm] = useState<Form>({
      username: {
        value: ""
      },
      password: {
        value: ""
      }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const fieldName: string = e.target.name;
      const fieldValue: string = e.target.value;
      const newField: Field = { [fieldName]: { value: fieldValue } };

      setForm({ ...form, ...newField });
      //setErrorMessage("");
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      login(form.username.value, form.password.value).then((data: any) => {
        if(data && data.error){
          setErrorMessage((data.error));
        }else{
          navigate("/profile");
        }
      }).catch((err: Error) => {
        console.error(err.message);
        setErrorMessage(err.message);
      });
    };

    return (
      <div className='min-h-48 bg-neutral-800 my-6 mx-4 rounded-lg p-4 text-white'>
        <h2 className='text-2xl mb-2 mt-1 ml-3 font-inter font-bold'>Log in</h2>
        <form className='flex flex-col font-inter font-medium text-sm' onSubmit={handleSubmit}>
          <label className='mt-2 text-left' htmlFor='username'>Username :</label>
          <TextInput value={form.username.value} name="username" placeholder='Enter username' onChange={handleInputChange} errorBorder={form.username.isValid}/>
          <label className='mt-2 text-left' htmlFor='password'>Password :</label>
          <TextInput value={form.password.value} password name="password" placeholder='Enter password' onChange={handleInputChange} errorBorder={form.password.isValid}/>
          <div className='error-message'>{errorMessage}</div>
          <Button name="Log in" submit/>
          <div className='mt-4 font-normal'>Don't have an account? <Link className="text-secondary underline" to="/register">Register here</Link></div>
        </form>
      </div>
    );
}

export default Login;