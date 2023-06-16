function getDaysByMonth(mes, anio) {
  const fechaInicio = new Date(anio, mes - 1, 1);
  const fechaFin = new Date(anio, mes, 0);
  const semana = {
    lunes:  [],
    martes: [],
    miercoles: [],
    jueves: [],
    viernes: [],
    sabado: [],
  };

  //Arreglar el ciclo
  let diaInicio = fechaInicio.getDate()
  let diaFinal = fechaFin.getDate()

  while (diaInicio <= diaFinal) {
    const date = new Date(anio, mes - 1, diaInicio);
    const diaSemana = date.getDay();

    if (diaSemana >= 1 && diaSemana <= 6) {
      const nombreDia = getDay(diaSemana);
      semana[nombreDia].push(new Date(date).toDateString());
    }

    diaInicio++;
  }

  return semana;
}

function getDay(diaSemana) {
  const nombresDias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  return nombresDias[diaSemana - 1];
}

export { getDaysByMonth }