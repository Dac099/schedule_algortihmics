import { orderLessonsByHours } from "../../utils/orderLessonsByHours";

function LessonsByDay({dates, day, lessons}){
  
  lessons = orderLessonsByHours(lessons);

  return(
    <article>

      <p>{day}</p>

      <section>
        {dates.map(date => (
          <section key={date}>
            <p>{date}</p>

            <p>Clases regulares</p>
            {lessons.map((lesson, index) => (
              <section key={index}>                
                <p>{lesson.lesson_name}</p>
                <p>{`${lesson.hours[0]} - ${lesson.hours[lesson.hours.length - 1]}`}</p>
              </section>
            ))}

            <p>Clases muestra</p>
            {/* Obtener las clases muestra */}

          </section>
        ))}
      </section>

    </article>
  );
}

export {LessonsByDay};