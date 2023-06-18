import { createContext, useState } from "react";

const LessonsContext = createContext();

function LessonsProvider({children}){
  const [ showModal, setShowModal ] = useState(false);

  return (
    <LessonsContext.Provider
      value={{
        showModal,
        setShowModal,
      }}
    >
      {children}
    </LessonsContext.Provider>
  );
}

export {LessonsContext, LessonsProvider}; 