function getDay(index){
  const days = ['Lunes', 'Martes',  'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  return days[index];
}


function getMonth(index){
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return months[index];
}

export {getDay, getMonth};