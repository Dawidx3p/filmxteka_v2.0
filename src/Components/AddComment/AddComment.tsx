import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as yup from 'yup'

type Props = {
    close: () => void
}

const AddComment = (props: Props) => {

    type Values = {
        comment: string,
    }

    const initialValues = {
        comment: '',
    }

    const onSubmit = (values:Values) => {
        
    }

    return (
        <Formik
        initialValues={initialValues}
        validationSchema={yup.object({
            comment: yup.string().required('Required'),
        })}
        onSubmit={onSubmit}
        >
            {({values, handleChange}) => <Form className="formik">
                <button className='warning' onClick={(e) => {
                    e.preventDefault();
                    props.close();
                }}>Close</button>
                <label htmlFor='comment'>Your Comment</label>
                <Field name="comment" as="textarea" rows="4"/>
                <ErrorMessage name="comment">
                    {msg => <span className="error">{msg}</span>}
                </ErrorMessage>
                <Field className="success" name="submit" type="submit"/>
            </Form>}
        </Formik>
    )
}

export default AddComment;