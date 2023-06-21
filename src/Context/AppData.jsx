import React from "react";
const AppContext = React.createContext();
import { getAllInstructors, getAllLessons } from "../firebase/firestore";

function AppContextProvider({children}){
  const [ instructors, setInstructors ] = React.useState([]);
  const [ lessons, setLessons ] = React.useState([]);
  const [ isLoading, setIsLoading ] = React.useState(true);
  const [ onError, setOnError ] = React.useState(false);

  React.useEffect(() => {
    async function fetchAppData(){
      try {
        setInstructors(await getAllInstructors());        
        setLessons(await getAllLessons());
        setIsLoading(false);
      } catch (error) {
        setOnError(true);
        setIsLoading(false);
        console.log(error);
      }
    }

    fetchAppData();

  }, []);

  return(
    <AppContext.Provider
      value={{
        instructors,
        setInstructors,
        lessons,
        setLessons,
        isLoading, 
        onError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export {AppContext, AppContextProvider};