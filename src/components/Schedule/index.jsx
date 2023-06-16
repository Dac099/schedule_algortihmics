import { getDaysByMonth } from "../../utils/getDays";
import { useState } from "react";
import { LessonsByDay } from "../LessonsByDay";
import { getMonth } from "../../utils/transformDates";
import { getAllLessons } from "../../firebase/firestore";

function Schedule(){
  const [date, setDate] = useState({
    month : new Date().getMonth(),
    year: new Date().getFullYear(),
  });    
  
  const days = Object.values(getDaysByMonth(date.month + 1, date.year));

  getAllLessons();

  return (
    <article>
      <section>
        <p>{`${getMonth(date.month)} ${date.year}`}</p>
        <article>
          <LessonsByDay day={'Lunes'}  dates={days[0]}/>
          <LessonsByDay day={'Martes'} dates={days[1]}/>
          <LessonsByDay day={'Miércoles'} dates={days[2]}/>
          <LessonsByDay day={'Jueves'} dates={days[3]}/>
          <LessonsByDay day={'Viernes'} dates={days[4]}/>
          <LessonsByDay day={'Sábado'} dates={days[5]}/>
        </article>
      </section>
      
      <section>
        <p>Maestros registrados</p>
      </section>
    </article>
  )
}

export {Schedule}