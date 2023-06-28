import React from "react";
const AppContext = React.createContext();
import { getAllInstructors, getAllLessons } from "../firebase/firestore";

function AppContextProvider({children}){
  const [ instructors, setInstructors ] = React.useState([]);
  const [ lessons, setLessons ] = React.useState([]);
  const [ isLoading, setIsLoading ] = React.useState(true);
  const [ onError, setOnError ] = React.useState(false);
  const [fetchData, setFetchData ] = React.useState(false);
  let lessonsWithoutInstructor = [];

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

    setIsLoading(true);
    setOnError(false);
    
    fetchAppData();
    lessonsWithoutInstructor = [...lessons.filter(lessons => lessons.instructor === '')];

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
        lessonsWithoutInstructor
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export {AppContext, AppContextProvider};