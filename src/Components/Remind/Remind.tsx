import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../../utils/auth";
import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as yup from 'yup'

const Remind = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

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
            .catch((error:{name:string,status:number,json:{error?:string,error_description?:string,code?:number,msg?:string}}) => {
              setSubmitting(false)
              if(error.json.error_description){
                setMessage(error.json.error_description)
              }else if((error.json.msg)){
                setMessage(error.json.msg)
              }
            })
        }else{
          setMessage('You are not logged in.')
          setSubmitting(false)
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
        password: yup.string().required('Required')
      })}
      onSubmit={onSubmit}
      >
        {() => <>
          <Form>
            <label htmlFor='password'>Your new password</label>
            <Field autoComplete="new-password" name="password" type="password"/>
            <ErrorMessage name="password">
              {msg => <span className="error">{msg}</span>}
            </ErrorMessage>
            <Field name="submit" type="submit" value="Change Password" disabled={isSubmitting}/>
            {message}
          </Form>
        </>}
      </Formik>
    </>
    )
}

export default Remind;