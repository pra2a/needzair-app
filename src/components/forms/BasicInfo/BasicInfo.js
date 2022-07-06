import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  useField,
  useFormikContext,
} from "formik";
import React, { useContext } from "react";
import { FormContext } from "../../../App";
import styled from "@emotion/styled";
import * as yup from "yup";

const BasicInfo = () => {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  const renderError = (message) => (
    <p className='italic text-red-600'>{message}</p>
  );

  const ValidationSchema = yup.object().shape({
    lastName: yup.string().required(),
    name: yup.string().url().required(),
  });

  const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: "checkbox" });
    return (
      <>
        <label className='checkbox'>
          <input {...field} {...props} type='checkbox' />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className='error'>{meta.error}</div>
        ) : null}
      </>
    );
  };

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

  // Styled components ....
  const StyledSelect = styled.select`
    color: var(--blue);
  `;

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

  const MySelect = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <>
        <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
        <StyledSelect {...field} {...props} />
        {meta.touched && meta.error ? (
          <StyledErrorMessage>{meta.error}</StyledErrorMessage>
        ) : null}
      </>
    );
  };

  return (
    <Formik
      initialValues={{
        name: "",
        lastname: "",
        isMilitar: false, // added for our checkbox
        isTemporal: false,
        documentType: "",
        documentNumber: "",
      }}
      validationSchema={ValidationSchema}
      onSubmit={(values) => {
        const data = { ...formData, ...values };
        setFormData(data);
        setActiveStepIndex(activeStepIndex + 1);
      }}
    >
      <Form className='flex flex-col justify-center items-center'>
        <div className='text-2xl font-medium self-center mb-2'>
          Registration Form
        </div>
        <div className='flex flex-col items-start mb-2'>
          <MyTextInput
            label='First Name'
            name='name'
            type='text'
            placeholder='Jane'
          />
          <ErrorMessage name='name' render={renderError} />
          <MyTextInput
            label='Last Name'
            name='lastName'
            type='text'
            placeholder='Doe'
          />
          <ErrorMessage name='lastName' render={renderError} />
        </div>

        <div className='flex flex-col items-start mb-2'>
          <MySelect label='Document Type' name='jobType'>
            <option value=''>Select a job type</option>
            <option value='designer'>Designer</option>
            <option value='development'>Developer</option>
            <option value='product'>Product Manager</option>
            <option value='other'>Other</option>
          </MySelect>
        </div>

        <MyCheckbox name='isMilitar'>is Militar?</MyCheckbox>
        <MyCheckbox name='isTemporal'>is Temporal?</MyCheckbox>
        <ErrorMessage name='workspaceURL' render={renderError} />
        <button
          className='rounded-md bg-indigo-500 font-medium text-white my-2 p-2'
          type='submit'
        >
          Continue
        </button>
      </Form>
    </Formik>
  );
};

export default BasicInfo;
