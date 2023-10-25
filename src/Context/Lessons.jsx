import { createContext, useState } from "react";

const LessonsContext = createContext();

function LessonsProvider({children}){
  const [ showModal, setShowModal ] = useState(false);
  const [ lessonsData, setLessonsData ] = useState(null);
  const [ trialLessonsData, setTrialLessonsData ] = useState(null);

  return (
    <LessonsContext.Provider
      value={{
        showModal,
        setShowModal,
        lessonsData,
        setLessonsData,
        trialLessonsData,
        setTrialLessonsData
      }}
    >
      {children}
    </LessonsContext.Provider>
  );
}

export {LessonsContext, LessonsProvider}; 