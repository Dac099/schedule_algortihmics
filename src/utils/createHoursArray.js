export function createHoursArray(begin_hour, end_hour){
  const horas_disponibles = [
    "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", 
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", 
    "17:00", "17:30", "18:00", "18:30", "19:00"
  ];

  /**
      1. buscar la posicion de hora_inicio
      2. buscar la posicion de hora_final
      3. recorrer el arreglo desde la posicion de hora_inicio hasta hora_final
      4. todos los elementos intermedios se guardan en un nuevo arreglo
  */

  const index_inicio = horas_disponibles.findIndex(hora => hora === begin_hour);
  const index_final = horas_disponibles.findIndex(hora => hora === end_hour); 

  const horario = [];

  for(let i = index_inicio; i <= index_final; i++){
      horario.push(horas_disponibles[i]);
  }

  console.log('Horario: ', horario);
  return horario;
}