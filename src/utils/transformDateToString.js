function transformDateToString(fechaInput) {
  const fecha = new Date(fechaInput);
  
  const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  
  const diaSemana = diasSemana[fecha.getDay() + 1];
  const dia = fecha.getDate() + 1;
  const mes = meses[fecha.getMonth()];
  
  return `${diaSemana}, ${dia} de ${mes}`;
}

export {transformDateToString};