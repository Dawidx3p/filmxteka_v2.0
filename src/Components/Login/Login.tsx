import React, { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as yup from 'yup'

import { auth } from '../../utils/auth'
import { Error } from '../../utils/types';

interface Props {
  login(): void;
}

const Login = (props:Props) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  interface InitialValues {
      email: string;
      password: string;
  }
  
  const initialValues = {
    email: '',
    password: ''
  }

  const onSubmit = (values: InitialValues ) => {
    setSubmitting(true)
    auth.login(values.email, values.password, false)
    .then(response => {
      setMessage('Logged in successfully');
      setSubmitting(false);
      props.login();
      navigate('/homepage');
    })
    .catch((error:Error) => {
      setSubmitting(false)
      if(error.json.error_description){
        setMessage(error.json.error_description)
      }else if((error.json.msg)){
        setMessage(error.json.msg)
      }else{
        setMessage('something went wrong')
      }
    })
  }

  const remindPassword = (e:React.MouseEvent, values: InitialValues) => {
    e.preventDefault();
    auth.requestPasswordRecovery(values.email)
    .then(response => {
    setMessage('Request sent successfully')
    navigate('/')
    })
    .catch((error:Error) => {
      if(error.json.error_description){
        setMessage(error.json.error_description)
      }else if((error.json.msg)){
        setMessage(error.json.msg)
      }else{
        setMessage('something went wrong')
      }
    })
  }

  useEffect(() => {
    if(location.hash.includes('confirmation_token')){
      auth.confirm(location.hash.slice(20), true)
      .then(() => {
          setMessage('Your email address has been successfully confirmed');
          props.login();
      })
      .catch((error:Error) => {
        if(error.json.error_description){
          setMessage(error.json.error_description)
        }else if((error.json.msg)){
          setMessage(error.json.msg)
        }else{
          setMessage('something went wrong')
        }
      })
    }else if(location.hash.includes('recovery_token')){
      auth.recover(location.hash.slice(16), true)
      .then((response) => {
        props.login();
        navigate('/remind');
      })
      .catch((error:Error) => {
        if(error.json.error_description){
          setMessage(error.json.error_description)
        }else if((error.json.msg)){
          setMessage(error.json.msg)
        }else{
          setMessage('something went wrong')
        }
      })
    }
  })
  return(
    <header>
      <Formik 
      initialValues={initialValues}
      validationSchema={yup.object({
        email: yup.string().required('Required'),
        password: yup.string().required('Required')
      })}
      onSubmit={onSubmit}
      >
      {({values}) => <>
        <Form>
          <label htmlFor='email'>e-mail</label>
          <Field autoComplete="email" name="email" type="email"/>
          <ErrorMessage name="email">
            {msg => <span className="error">{msg}</span>}
          </ErrorMessage>
          <label htmlFor='password'>Password</label>
          <Field autoComplete="current-password" name="password" type="password"/>
          <ErrorMessage name="password">
            {msg => <span className="error">{msg}</span>}
          </ErrorMessage>
          <Field name="submit" type="submit" value="Log In" disabled={isSubmitting}/>
          <Field className="transparent-primary" name="submit" type="submit" value="Register" onClick={(e:Event) => {
              e.preventDefault();
              navigate('/register');
          }} disabled={isSubmitting}/>
          <a onClick={(e) => remindPassword(e, values)} href="/login">Remind password</a>
          <Link to="/homepage">Guest session</Link>
          <div>{message}</div>
        </Form>
      </>}
    </Formik>
  </header>
  )
}

export default Login