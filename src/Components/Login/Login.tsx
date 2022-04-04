import GoTrue from "gotrue-js";
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as yup from 'yup'

const Login = () => {
    const navigate = useNavigate();
    const [isSubmitting, setSubmitting] = useState(false);
    const auth = new GoTrue({
        APIUrl: 'https://filmxteka.ml/.netlify/identity',
        audience: '',
        setCookie: true,
      });
    type InitialValues = {
        email: string,
        password: string
    }
    
    const onSubmit = (values: InitialValues ) => {
        setSubmitting(true)
        auth.login(values.email, values.password)
        .then(response => {
        console.log(JSON.stringify(response));
        setSubmitting(false)
        navigate('/')
        })
        .catch((error) => {
        setSubmitting(false)
        console.log(JSON.stringify(error))
        })
    }
    const initialValues = {
        email: '',
        password: ''
    }
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
                navigate('/')
                })
                .catch((error) => {
                console.log(JSON.stringify(error))
                })
            }} href="/">Remind password</a>
          </Form>
        </>}
      </Formik>
        <button onClick={() => console.log('user' + JSON.stringify(auth.currentUser()))}>Get user</button>
    </header>
    )
}

export default Login