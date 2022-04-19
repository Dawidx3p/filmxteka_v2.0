import React, { useState } from "react";
import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as yup from 'yup'

import { auth } from '../../utils/auth'

const Register = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    type InitialValues = {
        email: string,
        password: string
    }
    
    const onSubmit = (values: InitialValues ) => {
        setSubmitting(true)
        auth.signup(values.email, values.password)
        .then(() => {
        setMessage('signup confirmation sent')
        setSubmitting(false);
        })
        .catch((error:{name:string,status:number,json:{error?:string,error_description?:string,code?:number,msg?:string}}) => {
          setSubmitting(false)
          if(error.json.error_description){
            setMessage(error.json.error_description)
          }else if((error.json.msg)){
            setMessage(error.json.msg)
          }
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