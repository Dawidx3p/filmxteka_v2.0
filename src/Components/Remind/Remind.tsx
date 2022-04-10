import GoTrue from "gotrue-js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as yup from 'yup'

const Remind = () => {
    const navigate = useNavigate();
    const [isSubmitting, setSubmitting] = useState(false);
    const auth = new GoTrue({
        APIUrl: 'https://filmxteka.netlify.app/.netlify/identity',
        audience: '',
        setCookie: true,
    });
    const user = auth.currentUser();
    type InitialValues = {
        password: string
    }
    
    const onSubmit = (values: InitialValues ) => {
        setSubmitting(true)
        if(user){
            user
            .update({email: user.email, password: values.password})
            .then((user) => {
                console.log('Updated user %s', user);
                setSubmitting(false);
                navigate('/');
            })
            .catch((error) => {
                console.log('Failed to update user: %o', error);
                throw error;
            });
        }
    }
    const initialValues = {
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
        {() => <>
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
            <Field name="submit" type="submit" value="Change Password" disabled={isSubmitting}/>
          </Form>
        </>}
      </Formik>
    </>
    )
}

export default Remind;