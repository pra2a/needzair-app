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

const BasicInfo = () => {
  const {
    activeStepIndex,
    setActiveStepIndex,
    formData,
    setFormData,
    apiResponse,
    setApiResponse,
  } = useContext(FormContext);

  const [documentTypes, setDocumentTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedDocumentType, setSelectedDocumentType] = useState("");

  const url = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const getDocumentTypes = async () => {
      try {
        setIsLoading(true);
        const result = await axios.get(`${url}/type-document-tbs`);
        let allDocumentTypes = [];
        allDocumentTypes = result.data?.map(({ id, NameTypeDocument }) => ({
          id,
          NameTypeDocument,
        }));

        const [{ id: firstDocumentType } = {}] = allDocumentTypes;
        setDocumentTypes(allDocumentTypes);
        setSelectedDocumentType(firstDocumentType);
        setIsLoading(false);
      } catch (error) {
        setDocumentTypes([]);
        setIsLoading(false);
      }
    };

    getDocumentTypes();
  }, []);

  const renderError = (message) => (
    <p className='italic text-red-600'>{message}</p>
  );

  const ValidationSchema = yup.object().shape({
    lastName: yup.string().required(),
    name: yup.string().required(),
    documentNumber: yup.string().required(),
    documentType: yup.number().required(),
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
        lastName: "",
        isMilitar: false, // added for our checkbox
        isTemporal: false,
        documentType: "",
        documentNumber: "",
        placeExpedition: "",
        dateExpedition: "",
      }}
      validationSchema={ValidationSchema}
      onSubmit={(values) => {
        const data = { ...formData, ...values };
        setFormData(data);
        setActiveStepIndex(activeStepIndex + 1);
      }}
    >
      <Form className='flex flex-col justify-center items-center'>
        <div className='text-2xl font-medium self-center mb-2'>Basic Info</div>
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
          <MySelect label='Document Type' name='documentType'>
            <option value=''>Select a Document Type</option>
            {documentTypes.map(({ id, NameTypeDocument }) => (
              <option value={id} key={id}>
                {NameTypeDocument}
              </option>
            ))}
          </MySelect>
        </div>
        <div className='flex flex-col items-start mb-2'>
          <MyTextInput
            label='Document Number'
            name='documentNumber'
            type='text'
            placeholder='0000000'
          />
          <ErrorMessage name='documentNumber' render={renderError} />
        </div>
        <div className='flex flex-col items-start mb-2'>
          <MyTextInput
            label='Expedition Place'
            name='placeExpedition'
            type='text'
            placeholder='Expedition Place'
          />
          <ErrorMessage name='placeExpedition' render={renderError} />
        </div>
        <div className='flex flex-col items-start mb-2'>
          <MyTextInput
            label='Expedition Date'
            name='dateExpedition'
            type='date'
            placeholder='0000-00-00'
          />
          <ErrorMessage name='dateExpedition' render={renderError} />
        </div>
        <div className='flex flex-col items-start mb-2'>
          <MyCheckbox name='isMilitar'>is Militar?</MyCheckbox>
          <MyCheckbox name='isTemporal'>is Temporal?</MyCheckbox>
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

export default BasicInfo;
