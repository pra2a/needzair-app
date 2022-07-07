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

const ContactInfo = () => {
  const {
    activeStepIndex,
    setActiveStepIndex,
    formData,
    setFormData,
    apiResponse,
    setApiResponse,
  } = useContext(FormContext);

  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState("");

  const url = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const getCountries = async () => {
      try {
        setIsLoading(true);
        const result = await axios.get(`${url}/country-tbs`);
        let allCountries = [];
        allCountries = result.data?.map(({ id, CountryCode, CountryName }) => ({
          id,
          CountryCode,
          CountryName,
        }));

        const [{ id: firstCountry } = {}] = allCountries;
        setCountries(allCountries);
        setSelectedCountry(firstCountry);
        setIsLoading(false);
      } catch (error) {
        setCountries([]);
        setIsLoading(false);
      }
    };

    getCountries();
  }, []);

  const renderError = (message) => (
    <p className='italic text-red-600'>{message}</p>
  );

  const ValidationSchema = yup.object().shape({
    address: yup.string().required(),
    countryId: yup.number().required("Required"),
    city: yup.string().required(),
    phone: yup.string().required(),
    cellphone: yup.string().required(),
    emergencyName: yup.string().required(),
    emergencyPhone: yup.string().required(),
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
        address: "",
        countryId: "",
        city: "",
        phone: "",
        cellphone: "",
        emergencyName: "",
        emergencyPhone: "",
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
          Contact Info
        </div>
        <div className='flex flex-col items-start mb-2'>
          <MyTextInput
            label='Address'
            name='address'
            type='text'
            placeholder='Type Address'
          />
          <ErrorMessage name='documentNumber' render={renderError} />
        </div>
        <div className='flex flex-col items-start mb-2'>
          <MySelect label='Country' name='countryId'>
            <option value=''>Select a Country</option>
            {countries.map(({ id, CountryCode, CountryName }) => (
              <option value={id} key={CountryCode}>
                {CountryName}
              </option>
            ))}
          </MySelect>
          <ErrorMessage name='countryId' render={renderError} />
        </div>
        <div className='flex flex-col items-start mb-2'>
          <MyTextInput
            label='City'
            name='city'
            type='text'
            placeholder='Enter the City'
          />
          <ErrorMessage name='city' render={renderError} />
        </div>
        <div className='flex flex-col items-start mb-2'>
          <MyTextInput
            label='Phone Number'
            name='phone'
            type='text'
            placeholder='Enter your Phone Number'
          />
          <ErrorMessage name='phone' render={renderError} />
        </div>
        <div className='flex flex-col items-start mb-2'>
          <MyTextInput
            label='Mobile Phone'
            name='cellphone'
            type='text'
            placeholder='Enter your Mobile Phone Number'
          />
          <ErrorMessage name='cellphone' render={renderError} />
        </div>
        <div className='flex flex-col items-start mb-2'>
          <MyTextInput
            label='Emergency Contact Name'
            name='emergencyName'
            type='text'
            placeholder='Enter your Emergency Contact Name'
          />
          <ErrorMessage name='emergencyName' render={renderError} />
        </div>
        <div className='flex flex-col items-start mb-2'>
          <MyTextInput
            label='Emergency Contact Phone'
            name='emergencyPhone'
            type='text'
            placeholder='Enter your Emergency Contact Phone'
          />
          <ErrorMessage name='emergencyPhone' render={renderError} />
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

export default ContactInfo;
