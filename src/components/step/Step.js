import React, { useContext } from "react";
import { FormContext } from "../../App";
import { BasicInfo, Success, UserInfo, ContactInfo } from "../forms";

function Step() {
  const { activeStepIndex } = useContext(FormContext);
  let stepContent;
  switch (activeStepIndex) {
    case 0:
      stepContent = <BasicInfo />;
      break;
    case 1:
      stepContent = <ContactInfo />;
      break;
    case 2:
      stepContent = <UserInfo />;
      break;
    case 3:
      stepContent = <Success />;
      break;
    default:
      break;
  }

  return stepContent;
}

export default Step;
