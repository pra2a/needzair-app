import React, { useContext } from "react";
import { FormContext } from "../../../App";

function Success() {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData } =
    useContext(FormContext);

  const responseMessage = formData.apiresponse;

  return <div className='font-medium warning'>{responseMessage}</div>;
}

export default Success;
