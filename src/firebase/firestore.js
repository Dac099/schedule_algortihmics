import { collection, doc, getDocs, getFirestore, query } from 'firebase/firestore';
import { app } from './firebase_sdk';

const db = getFirestore(app);

async function getInstructorById(id){
  const docRef = doc(db, 'instructors', id);
  const docSnap = await getDoc(docRef);

  if(docSnap.exists()){
    console.log('Instructor data:', docSnap.data());
  }else{
    console.log('Instructor no encontrado');
  }
}

async function getAllLessons(){
  const queryDB = query(collection(db, 'lessons'));
  const querySnapshot = await getDocs(queryDB);
  const lessons = [];

  querySnapshot.forEach(doc => lessons.push(doc.data()));

  return lessons;
}

async function getAllInstructors(){
  const queryDB = query(collection(db, 'instructors'));
  const querySnashot = await getDocs(queryDB);
  const instructors = [];

  querySnashot.forEach(doc => instructors.push(doc.data()))

  return instructors;
}

export {
  getInstructorById,
  getAllLessons,
  getAllInstructors,
};