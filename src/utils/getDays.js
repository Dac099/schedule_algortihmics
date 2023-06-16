function obtenerRepeticionesDiasSemana(mes, anio) {
  const fechaInicio = new Date(anio, mes - 1, 1);
  const fechaFin = new Date(anio, mes, 0);
  const semana = {
    lunes: { repeticiones: 0, fechas: [] },
    martes: { repeticiones: 0, fechas: [] },
    miercoles: { repeticiones: 0, fechas: [] },
    jueves: { repeticiones: 0, fechas: [] },
    viernes: { repeticiones: 0, fechas: [] },
    sabado: { repeticiones: 0, fechas: [] }
  };
    
    //Arreglar el ciclo
    let diaInicio = fechaInicio.getDate()
    let diaFinal = fechaFin.getDate()

    console.log('dia inicio:', diaInicio)
    console.log('dia final', diaFinal)

  while (diaInicio <= diaFinal) {
    const date = new Date(anio, mes - 1, diaInicio);
    const diaSemana = date.getDay();

    console.log('date:', date)
    console.log('dia semana:', diaSemana)

    if (diaSemana >= 1 && diaSemana <= 6) {
      const nombreDia = obtenerNombreDia(diaSemana);
      console.log('nombre dia:', nombreDia)

      semana[nombreDia].repeticiones++;
      semana[nombreDia].fechas.push(new Date(date).toDateString());
    }

    diaInicio++;
  }

  return semana;
}

function obtenerNombreDia(diaSemana) {
  const nombresDias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  return nombresDias[diaSemana - 1];
}