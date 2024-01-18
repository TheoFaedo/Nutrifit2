import React, { FunctionComponent, useState } from 'react';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import SelectorButton from '../components/SelectorButton';
import TiledSelectorButton from '../components/TiledSelectorButton';
import { register } from '../services/api-service';
import { validEmail, validGender, validGoal, validPassword, validUsername } from '../helpers/fieldHelper';
import { useToasts } from '../context/ToastContext';
import Mail from '../models/valueObjects/Mail';

type Field = {
  value?: any;
  error?: string;
  isValid?: boolean;
}

type Form = {
  username: Field;
  password: Field;
  passwordConfirm: Field;
  email: Field;
  gender: Field;
  goal: Field;
}

const Register: FunctionComponent = () => {

    const { pushToast } = useToasts();

    const navigate = useNavigate();

    const [form, setForm] = useState<Form>({
        username: {
            value: "",
            error: "",
            isValid: true
        },
        password: {
            value: "",
            error: "",
            isValid: true
        },
        passwordConfirm: {
            value: "",
            error: "",
            isValid: true
        },
        email: {
            value: "",
            error: "",
            isValid: true
        },
        gender: {
            value: 0,
            error: "",
            isValid: true
        },
        goal: {
            value: 0,
            error: "",
            isValid: true
        }
    })

    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const fieldName: string = e.target.name;
      const fieldValue: string = e.target.value;
      const newField: Field = { [fieldName]: { value: fieldValue, error: "", isValid: true } };

      setForm({ ...form, ...newField });
    }

    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
      setForm({
        ...form,
        gender: {
          value: index,
          error: "",
          isValid: true
        }
      })
    }

    const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
      setForm({
        ...form,
        goal: {
          value: index,
          error: "",
          isValid: true
        }
      })
    }

    const validateForm = (): boolean => {
      let newForm : Form = form;

      if(validUsername(newForm.username.value)){
          const newField = { value: newForm.username.value, error: "", isValid: true };
          newForm = { ...newForm, username: newField };
      }else{
          const newField = { value: newForm.username.value, error: "Invalid username", isValid: false };
          newForm = { ...newForm, username: newField };
      }

      if(validGender((newForm.gender.value === 0 ? "M" : "F"))){
          const newField = { value: newForm.gender.value, error: "", isValid: true };
          newForm = { ...newForm, gender: newField };
      }else{
        
          const newField = { value: newForm.gender.value, error: "Invalid gender", isValid: false };
          newForm = { ...newForm, gender: newField };
      }

      if(validPassword(newForm.password.value)){
          const newField = { value: newForm.password.value, error: "", isValid: true };
          newForm = { ...newForm, password: newField };
      }else{
          const newField = { value: newForm.password.value, error: "Invalid password", isValid: false };
          newForm = { ...newForm, password: newField };
      }

      if(newForm.password.value === newForm.passwordConfirm.value){
          const newField = { value: newForm.passwordConfirm.value, error: "", isValid: true };
          newForm = { ...newForm, passwordConfirm: newField };
      }else{
          const newField = { value: newForm.passwordConfirm.value, error: "Passwords do not match", isValid: false };
          newForm = { ...newForm, passwordConfirm: newField };
      }


      if(validEmail(newForm.email.value)){
          const newField = { value: newForm.email.value, error: "", isValid: true };
          newForm = { ...newForm, email: newField };
      }else{
          const newField = { value: newForm.email.value, error: "Invalid email", isValid: false };
          newForm = { ...newForm, email: newField };
      }

      if(validGoal(newForm.goal.value+1)){
          const newField = { value: newForm.goal.value, error: "", isValid: true };
          newForm = { ...newForm, goal: newField };
      }else{
          const newField = { value: newForm.goal.value, error: "Invalid goal", isValid: false };
          newForm = { ...newForm, goal: newField };
      }

        setForm(newForm);
        return (newForm.username.isValid && newForm.password.isValid && newForm.passwordConfirm.isValid && newForm.email.isValid && newForm.gender.isValid && newForm.goal.isValid)? true : false;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();

      if(!validateForm()){
        return
      }
      
      const userToRegister = {
        pseudo: form.username.value,
        password: form.password.value,
        mail: Mail.create(form.email.value),
        gender: form.gender.value === 0 ? "M" : "F",
        goal: (form.goal.value+1)
      }

      register(userToRegister).then(
        (response) => {
          if("success" in response){
            pushToast({
              type: "success",
              content: "Account created successfully",
            })
            navigate('/login');
          }else if("errors" in response){
              setErrorMessage(response.errors);
          }
        }
      );

    }

    return (
        <div className='min-h-48 bg-neutral-800 my-6 mx-4 rounded-lg p-4 text-white'>
        <h2 className='text-2xl mb-2 mt-1 ml-3 font-inter font-bold'>Sign up</h2>
        <form className='flex flex-col font-inter font-medium text-sm' onSubmit={handleSubmit}>
          <label className='mt-2 text-left' htmlFor='username'>Username :</label>
          <TextInput value={form.username.value} name="username" placeholder='Enter username' onChange={handleInputChange} errorBorder={!form.username.isValid} errorMessage={form.username.error}/>

          <label className='mt-2 text-left' htmlFor='password'>Gender :</label> 
          <SelectorButton names={["Male", "Female"]} active={form.gender.value} onClick={handleGenderChange}/>

          <label className='mt-2 text-left' htmlFor='password'>Password :</label> 
          <TextInput value={form.password.value} password name="password" placeholder='Enter password' onChange={handleInputChange} errorBorder={!form.password.isValid} errorMessage={form.password.error}/>
          
          <label className='mt-2 text-left' htmlFor='passwordConfirm'>Confirm password :</label>
          <TextInput value={form.passwordConfirm.value} password name="passwordConfirm" placeholder='Re-enter password' onChange={handleInputChange} errorBorder={!form.passwordConfirm.isValid} errorMessage={form.passwordConfirm.error}/>
          
          <label className='mt-2 text-left' htmlFor='email'>Mail :</label>
          <TextInput value={form.email.value} name="email" placeholder='Enter email adress' onChange={handleInputChange} errorBorder={!form.email.isValid} errorMessage={form.email.error}/>

          <label className='mt-2 text-left' htmlFor='password'>Your Goal :</label>
          <TiledSelectorButton names={["Lose", "Maintain", "Gain"]} active={form.goal.value} onClick={handleGoalChange} />
          
          <div className='mt-6'>
            <div className='error-message'>{errorMessage}</div>
          </div>
          
          <Button name="Sign up" submit/>
          <div className='mt-4 font-normal'>Do you have an account? <Link className="text-secondary underline" to="/login">Login here</Link></div>
        </form>
      </div>
    );
}

export default Register;