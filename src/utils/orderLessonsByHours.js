function orderLessonsByHours(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)].hours;
  const lesser = [];
  const greater = [];

  for (const obj of arr) {
    if (obj.hours > pivot) {
      greater.push(obj);
    } else if (obj.hours < pivot) {
      lesser.push(obj);
    }
  }

  return [
    ...orderLessonsByHours(lesser), 
    ...arr.filter(obj => obj.hours === pivot), 
    ...orderLessonsByHours(greater)
  ];
}

export {orderLessonsByHours};