//Date example: "Viernes, 21 de Julio"

function transformStringDate(string_date){

  const day = fecha.split(' ')[1];
  const month_string = fecha.split(' ')[3];
  const year = new Date().getFullYear();

  const months = {
    'Enero' :      0,
    'Febrero' :    1,
    'Marzo' :      2,
    'Abril' :      3,
    'Mayo' :       4,
    'Junio' :      5,
    'Julio' :      6,
    'Agosto' :     7,
    'Septiembre' : 8,
    'Octubre' :    9,
    'Noviembre' : 10,
    'Diciembre' : 11,
  } 

  const index_month = months[month_string] + 1;
  const string_date = `${index_month}/${day}/${year}`;
  const date_for_input = new Date(string_date).toISOString().split('T')[0];

  return {
    string_date,
    date_for_input
  };
}

export {transformStringDate};