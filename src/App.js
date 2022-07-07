import { createContext, useState } from "react";
import Step from "./components/step/Step";
import Stepper from "./components/stepper/Stepper";
export const FormContext = createContext();

function App() {
  const [activeStepIndex, setActiveStepIndex, apiResponse, setApiResponse] =
    useState(0);
  const [formData, setFormData] = useState({});

  return (
    <FormContext.Provider
      value={{
        activeStepIndex,
        setActiveStepIndex,
        formData,
        setFormData,
        apiResponse,
        setApiResponse,
      }}
    >
      <div className='w-full h-full flex flex-col items-center justify-start'>
        <div className='text-2xl font-medium self-center mb-2'>
          Registration Form
        </div>
        <Stepper />
        <Step />
      </div>
    </FormContext.Provider>
  );
}

export default App;
