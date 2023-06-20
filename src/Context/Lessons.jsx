import { createContext, useState } from "react";

const LessonsContext = createContext();

function LessonsProvider({children}){
  const [ showModal, setShowModal ] = useState(false);
  const [ lessonsData, setLessonsData ] = useState(null);

  return (
    <LessonsContext.Provider
      value={{
        showModal,
        setShowModal,
        lessonsData,
        setLessonsData
      }}
    >
      {children}
    </LessonsContext.Provider>
  );
}

export {LessonsContext, LessonsProvider}; 