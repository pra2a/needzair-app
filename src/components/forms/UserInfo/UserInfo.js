import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  useField,
  useFormikContext,
} from "formik";
import React, { useContext, useState, useEffect } from "react";
import { FormContext } from "../../../App";
import styled from "@emotion/styled";
import * as yup from "yup";
import axios from "axios";
import { BASE_API_URL } from "../../../utils/constants";

const UserInfo = () => {
  const {
    activeStepIndex,
    setActiveStepIndex,
    formData,
    setFormData,
    apiResponse,
    setApiResponse,
  } = useContext(FormContext);

  const renderError = (message) => (
    <p className='italic text-red-600'>{message}</p>
  );

  const ValidationSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
  });

  const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className='text-input' {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className='error'>{meta.error}</div>
        ) : null}
      </>
    );
  };

  const StyledErrorMessage = styled.div`
    font-size: 12px;
    color: var(--red-600);
    width: 400px;
    margin-top: 0.25rem;
    &:before {
      content: "❌ ";
      font-size: 10px;
    }
    @media (prefers-color-scheme: dark) {
      color: var(--red-300);
    }
  `;

  const StyledLabel = styled.label`
    margin-top: 1rem;
  `;

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        apiresponse: "",
      }}
      validationSchema={ValidationSchema}
      onSubmit={async (values) => {
        const data = { ...formData, ...values };
        setFormData(data);
        try {
          const response = await axios.post(`${BASE_API_URL}/usersAll`, data);
          data.apiresponse = response.data.message;
          setFormData(data);
        } catch (error) {
          console.log(error);
          data.apiresponse =
            "Ocurrio un error creando el usuario, intente nuevamente!";
          setFormData(data);
          if (error.response) {
            console.log("error", error.response.data);
          }
        }
        setActiveStepIndex(activeStepIndex + 1);
      }}
    >
      <Form className='flex flex-col justify-center items-center'>
        <div className='text-2xl font-medium self-center mb-2'>User Info</div>
        <div className='flex flex-col items-start mb-2'>
          <MyTextInput
            label='Username'
            name='username'
            type='text'
            placeholder='Enter your Username'
          />
          <ErrorMessage name='username' render={renderError} />
        </div>
        <div className='flex flex-col items-start mb-2'>
          <MyTextInput
            label='Email Address'
            name='email'
            type='text'
            placeholder='Enter your email address'
          />
          <ErrorMessage name='email' render={renderError} />
        </div>
        <div className='flex flex-col items-start mb-2'>
          <MyTextInput
            label='Password'
            name='password'
            type='password'
            placeholder='Enter your password'
          />
          <ErrorMessage name='password' render={renderError} />
        </div>
        <button
          className='rounded-md bg-blue-600 font-medium text-white my-2 p-2'
          type='submit'
        >
          Continue
        </button>
      </Form>
    </Formik>
  );
};

export default UserInfo;
