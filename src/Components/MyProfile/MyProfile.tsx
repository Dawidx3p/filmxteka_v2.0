import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from 'yup'

import { auth } from "../../utils/auth";
import { getCommentsByEmail } from "../../utils/api";
import { Comment } from "../../utils/types";
import { useNavigate } from "react-router-dom";

interface Profile{
    name: string,
    bday: string,
    description: string
}

const MyProfile = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [comments, setComments] = useState<Comment[]>([])

    const user = auth.currentUser();
    const navigate = useNavigate();

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
        user.update({data: {...values}})
        .then(data => {
          setSubmitting(false);
          console.log(data)
        })
        .catch(err => {
          setSubmitting(false);
          setErrorMessage(err)
        });
      }
    }

    useEffect(() => {
      if(user){
        getCommentsByEmail(user.email)
        .then((data: Comment[]) => {
          setComments(data)
        })
      }
    },[user])

    
    return(
      <main>
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
            <Field name="submit" type="submit" value="Update profile" disabled={isSubmitting}/>
            {errorMessage}
          </Form>
        </>}
      </Formik>
      <div>
        <h1>Comments</h1>
        {comments.map((comment, key) => <div>
          <h4>{comment.data.author.name || comment.data.author.email}</h4>
          <p>{comment.data.text}</p>
          <button onClick={() => {
            navigate(`/film/${comment.data.filmId}`)
          }} className="primary">Go to movie</button>
        </div>)}
        {!comments.length && "no comments yet"}
      </div>
      </main>

    )
}

export default MyProfile;