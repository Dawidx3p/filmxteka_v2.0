import React, { useState } from "react";
import GoTrue from 'gotrue-js';
import { useNavigate } from "react-router-dom";

import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as yup from 'yup'

const Register = () => {
    const navigate = useNavigate();
    const [isSubmitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const auth = new GoTrue({
        APIUrl: 'https://filmxteka.netlify.app/.netlify/identity',
        audience: '',
        setCookie: true,
      });
    type InitialValues = {
        email: string,
        password: string
    }
    
    const onSubmit = (values: InitialValues ) => {
        setSubmitting(true)
        auth.signup(values.email, values.password)
        .then(response => {
        console.log(JSON.stringify(response));
        setSubmitting(false);
        navigate('/');
        })
        .catch((error: {name: string, status: number, data: string}) => {
          setSubmitting(false)
          setMessage(error.data)
        })
    }
    const initialValues = {
        email: '',
        password: ''
    }
    return(
        <>
        <Formik 
      initialValues={initialValues}
      validationSchema={yup.object({
        email: yup.string().required('Required'),
        password: yup.string().required('Required')
      })}
      onSubmit={onSubmit}
      >
        {() => <header>
          <Form>
            <label htmlFor='email'>e-mail</label>
            <Field autoComplete="email" name="email" type="email"/>
            <ErrorMessage name="email">
              {msg => <span className="error">{msg}</span>}
            </ErrorMessage>
            <label htmlFor='password'>Password</label>
            <Field autoComplete="new-password" name="password" type="password"/>
            <ErrorMessage name="password">
              {msg => <span className="error">{msg}</span>}
            </ErrorMessage>
            <Field name="submit" type="submit" value="Register" disabled={isSubmitting}/>
            {message}
          </Form>
        </header>}
      </Formik>
    </>
    )
}

export default Register;