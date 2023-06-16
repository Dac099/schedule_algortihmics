function LessonsByDay({dates, day}){
  
  return(
    <article>
      <p>{day}</p>
      <section>
        {dates.map(date => (
          <section key={date}>
            <p>Aqui aparecen las clases</p>
          </section>
        ))}
      </section>
    </article>
  );
}

export {LessonsByDay};