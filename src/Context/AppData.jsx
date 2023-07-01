import React from "react";
const AppContext = React.createContext();
import { getAllInstructors, getAllLessons, getTrialLessons } from "../firebase/firestore";

function AppContextProvider({children}){
  const [ instructors, setInstructors ] = React.useState([]);
  const [ lessons, setLessons ] = React.useState([]);
  const [ isLoading, setIsLoading ] = React.useState(true);
  const [ onError, setOnError ] = React.useState(false);
  const [ fetchData, setFetchData ] = React.useState(false);
  const [ trialLessons, setTrialLessons ] = React.useState([]);

  React.useEffect(() => {
    async function fetchAppData(){
      try {

        setInstructors(await getAllInstructors());        
        setLessons(await getAllLessons());
        setTrialLessons(await getTrialLessons());
        setIsLoading(false);

      } catch (error) {
        
        setOnError(true);        
        setIsLoading(false);
        console.log(error);
      }
    }

    setIsLoading(true);
    setOnError(false);
    
    fetchAppData();

  }, [fetchData]);

  return(
    <AppContext.Provider
      value={{
        instructors,
        setInstructors,
        lessons,
        setLessons,
        isLoading, 
        onError,
        fetchData,
        setFetchData,
        trialLessons
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export {AppContext, AppContextProvider};