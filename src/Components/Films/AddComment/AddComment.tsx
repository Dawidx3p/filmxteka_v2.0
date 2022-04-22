import React, { useMemo } from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as yup from 'yup'

import { createComment, updateComment } from '../../../utils/api';
import { Comment } from '../../../utils/types';
import { auth } from '../../../utils/auth';

type Props = {
    close: () => void;
    filmId: number;
    addComment: (comment: Comment) => void;
    comments: Comment[];
    updateCommentInState: (comment: Comment) => void;
}

type Values = {
    text: string,
}

const AddComment = (props: Props) => {
    const user = auth.currentUser()
    const myComment = useMemo(() => {
        if(user){
            return props.comments.find(comment => comment.data.author.email===user.email);
        }else{
            return undefined;
        }
    },[props.comments, user])

    const initialValues = {
        text: '',
    }

    const onSubmit = (values:Values) => {  
        if(myComment && myComment.ref && user){
            updateComment({
                data: {
                    ...values, 
                    author: {
                        email: user.email, 
                        name: user.user_metadata.name
                    }, 
                    filmId: props.filmId, 
                    lastModified: new Date().toLocaleString()
            }}, myComment.ref['@ref'].id)
            .then((data: Comment) => {
                if(data){
                    props.updateCommentInState(data)
                }
            })
            .catch((err) => console.error(err))
        }else if(user){
            createComment({
                data: {
                    ...values, 
                    author: {
                        email: user.email,
                        name: user.user_metadata.name
                    }, 
                    filmId: props.filmId, 
                    createdAt: new Date().toLocaleString(), 
                    lastModified: new Date().toLocaleString()
            }})
            .then((data: Comment) => {
                if(data){
                    props.addComment(data)
                }
            })
            .catch((err) => console.error(err))
        }
    }

    return (
        <Formik
        initialValues={initialValues}
        validationSchema={yup.object({
            text: yup.string().required('Required').min(30, 'Review must be at least 30 characters'),
        })}
        onSubmit={onSubmit}
        >
            {({values, handleChange}) => <Form className="formik">
                <button className='warning' onClick={(e) => {
                    e.preventDefault();
                    props.close();
                }}>Close</button>
                <label htmlFor='text'>Your Review</label>
                <Field name="text" as="textarea" rows="5" cols="52"/>
                <ErrorMessage name="text">
                    {msg => <span className="error">{msg}</span>}
                </ErrorMessage>
                <Field className="success" name="submit" type="submit"/>
            </Form>}
        </Formik>
    )
}

export default AddComment;