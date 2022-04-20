import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from 'yup'

import { User } from '../../utils/types';
import { createUser, getUserByEmail, updateUser } from "../../utils/api";
import { auth } from "../../utils/auth";

interface Profile{
    name: string,
    bday: string,
    description: string
}

interface Props{
  myProfile: User|undefined
}

const MyProfile = ({myProfile}:Props) => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const initialValues:Profile = {
        name: '',
        bday: '',
        description: ''
      }
      const onSubmit = (values: Profile ) => {
        console.log(values)
        setSubmitting(true);
        const user = auth.currentUser();
        if(user){
          getUserByEmail(user.email)
          .then((users:User[]) => {
            if(!users.length){
              createUser({data: {...values, email: user.email}})
              .then(() => setSubmitting(false))
              .catch(err => setErrorMessage(err))
            }else if(users[0].ref){
              updateUser({data: {...values, email: user.email}}, users[0].ref["@ref"].id)
              .then(() => setSubmitting(false))
              .catch(err => setErrorMessage(err))
            }
          })
          
        }
      }
    
    return(
        <Formik 
        initialValues={initialValues}
        validationSchema={yup.object({
          name: yup.string().required('Required'),
          bday: yup.string(),
          description: yup.string().min(20)
        })}
        onSubmit={onSubmit}
        >
        {({values}) => <>
          <Form>
            <label htmlFor='name'>Name</label>
            <Field autoComplete="given-name" name="name" type="text"/>
            <ErrorMessage name="name">
              {msg => <span className="error">{msg}</span>}
            </ErrorMessage>
            <label htmlFor='bday'>Birth Date</label>
            <Field autoComplete="bday" name="bday" type="date"/>
            <ErrorMessage name="bday">
              {msg => <span className="error">{msg}</span>}
            </ErrorMessage>
            <label htmlFor='description'>Description</label>
            <Field name="description" as="textarea" rows="5" cols="52"/>
            <ErrorMessage name="description">
                {msg => <span className="error">{msg}</span>}
            </ErrorMessage>
            <Field name="submit" type="submit" value="Create profile" disabled={isSubmitting}/>
            {errorMessage}
          </Form>
        </>}
      </Formik>
    )
}

export default MyProfile;