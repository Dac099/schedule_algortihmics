import React from "react";
const AppContext = React.createContext();
import { 
  getAllInstructors, 
  getAllLessons, 
  getTrialLessons,
  getDaysOff,
  getHoursDB
} from "../firebase/firestore";
import { getImagesList } from "../firebase/storage";

function AppContextProvider({children}){
  const [ instructors, setInstructors ] = React.useState([]);
  const [ lessons, setLessons ] = React.useState([]);
  const [ isLoading, setIsLoading ] = React.useState(true);
  const [ onError, setOnError ] = React.useState(false);
  const [ fetchData, setFetchData ] = React.useState(false);
  const [ trialLessons, setTrialLessons ] = React.useState([]);
  const [ daysOff, setDaysOff ] = React.useState([]);
  const [ imagesList, setImagesList ] = React.useState();
  const [ dbHours, setDbHours ] = React.useState([]);

  React.useEffect(() => {
    async function fetchAppData(){
      try {

        const [ instructors, lessons, trialLessons, daysOff, images, hours ] = await Promise.all([
          getAllInstructors(), getAllLessons(), getTrialLessons(),getDaysOff(), getImagesList(), getHoursDB()
        ]);

        setInstructors(instructors);        
        setLessons(lessons);
        setTrialLessons(trialLessons);
        setDaysOff(daysOff);
        setIsLoading(false);
        setImagesList(images);
        setDbHours(hours);

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
        trialLessons,
        daysOff,
        imagesList,
        dbHours
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export {AppContext, AppContextProvider};