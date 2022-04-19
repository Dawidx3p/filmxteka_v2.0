import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from 'yup'

import { createUser } from "../../utils/api";
import { auth } from "../../utils/auth";

type Profile = {
    name: string,
    bday: string,
    description: string
}

const MyProfile = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    
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
          createUser({...values, email: user.email})
          .then(() => setSubmitting(false))
          .catch(err => console.log(err))
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
          </Form>
        </>}
      </Formik>
    )
}

export default MyProfile;