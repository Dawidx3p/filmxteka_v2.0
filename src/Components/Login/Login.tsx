import GoTrue from "gotrue-js";
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";

import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as yup from 'yup'

const Login = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const auth = new GoTrue({
      APIUrl: 'https://filmxteka.netlify.app/.netlify/identity',
      audience: '',
      setCookie: true,
    });
  type InitialValues = {
      email: string,
      password: string
  }
  
  const initialValues = {
    email: '',
    password: ''
  }

  const onSubmit = (values: InitialValues ) => {
    setSubmitting(true)
    auth.login(values.email, values.password)
    .then(response => {
    setMessage('Logged in successfully')
    setSubmitting(false)
    navigate('/homepage')
    })
    .catch((error: {name: string, status: number, data: string}) => {
    setSubmitting(false)
    setMessage(error.data)
    })
  }

  useEffect(() => {
    if(location.hash.includes('confirmation_token')){
        auth
        .confirm(location.hash.slice(20), true)
        .then((response) => {
            console.log('Confirmation email sent', JSON.stringify({ response }));
        })
        .catch((error) => {
            console.log(error);
        });
    }else if(location.hash.includes('recovery_token')){
        auth
        .recover(location.hash.slice(16), true)
        .then((response) => {
            console.log('Logged in as %s', JSON.stringify({ response }))
            navigate('/remind');
        })
        .catch((error) => console.log('Failed to verify recover token: %o', error));
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
          <a onClick={(e) => {
              e.preventDefault();
              auth.requestPasswordRecovery(values.email)
              .then(response => {
              console.log(JSON.stringify(response));
              navigate('/login')
              })
              .catch((error) => {
              console.log(JSON.stringify(error))
              })
          }} href="/login">Remind password</a>
          <div>{message}</div>
        </Form>
      </>}
    </Formik>
      <button onClick={() => console.log('user' + JSON.stringify(auth.currentUser()))}>Get user</button>
  </header>
  )
}

export default Login