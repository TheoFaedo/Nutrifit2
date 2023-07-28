import { FunctionComponent, useEffect, useState } from 'react';
import Button from './../components/Button';
import TextInput from '../components/TextInput';
import { connect } from '../services/api-service';
import { useNavigate } from 'react-router-dom';
import AuthenticationService from '../services/authentication-service';
import { Link } from 'react-router-dom';

type Props = {
  hideNavBar: Function;
}

type Field = {
  value?: any;
  error?: string;
  isValid?: boolean;
}

type Form = {
  username: Field;
  password: Field;
}

const Login: FunctionComponent<Props> = (props) => {

    useEffect(() => {
        props.hideNavBar();
    }, [])

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
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      connect(form.username.value, form.password.value).then((res) => {
        if(res.success){
          AuthenticationService.authentify();
          navigate('/profile');
        }else{
          if(res.error){
            res.error.type ? setErrorMessage("Server error") : setErrorMessage(res.error);
            setForm(
              {
                username: {
                  ...form.username,
                  isValid: true
                },
                password: {
                  ...form.password,
                  isValid: true
                }
              }
            )
          }
        }
      })
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