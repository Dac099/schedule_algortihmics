import styles from "./DayWeek.module.css";
import { orderLessonsByHours } from "../../utils/orderLessonsByHours";
import { Day } from "../Day";


function DayWeek({dates, day, lessons, dayMonth, dayReference}){
  
  lessons = orderLessonsByHours(lessons);
 
  if(dayMonth < dayReference){
    dates = ['', ...dates];
  }

  return(
    <article>

      <p className={styles.week_day}>{day}</p>

      <section className={styles.lessons_container}>
        {dates.map((date, index) => (          
          <Day 
            key={date}
            date={date} 
            lessons={lessons}
          />
        ))}
      </section>

    </article>
  );
}

export {DayWeek};