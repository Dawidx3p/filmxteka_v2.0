import React, { useMemo } from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as yup from 'yup'
import GoTrue from 'gotrue-js';
import { createComment, updateComment } from '../../utils/api';
import { Comment } from '../../utils/types';

type Props = {
    close: () => void;
    filmId: number;
    addComment: (comment: Comment) => void;
    comments: Comment[]|undefined;
    updateCommentInState: (comment: Comment) => void;
}

type Values = {
    text: string,
}

const AddComment = (props: Props) => {

    const auth = useMemo(() => {
        return new GoTrue({
            APIUrl: 'https://filmxteka.netlify.app/.netlify/identity',
            audience: '',
            setCookie: true,
        })
    },[])

    const myComment = useMemo(() => {
        return props.comments?.find(comment => comment.data.author.email===auth.currentUser()?.email);
    },[props.comments, auth])

    const initialValues = {
        text: '',
    }

    const onSubmit = (values:Values) => {  
        if(myComment && myComment.ref){
            updateComment({data: {...values, 
                author: {email: auth.currentUser()?.email || ''}, 
                filmId: props.filmId, 
                lastModified: new Date().toLocaleString()
            }},myComment.ref['@ref'].id)
            .then((data: Comment) => {
                if(data){
                    props.updateCommentInState(data)
                }
            })
            .catch((err) => console.error(err))
        }else{
            createComment({data: {...values, 
                author: {email: auth.currentUser()?.email || ''}, 
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
            text: yup.string().required('Required').min(30, 'minimum 30 characters'),
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