import { collection, doc, getDocs, getFirestore, query, getDoc } from 'firebase/firestore';
import { app } from './firebase_sdk';

const db = getFirestore(app);

async function getAllLessons(){
  const queryDB = query(collection(db, 'lessons'));
  const querySnapshot = await getDocs(queryDB);
  const lessons = [];

  querySnapshot.forEach(async doc => {
    const instructorRef = doc.data().instructor;
    const instructorDoc = await getDoc(instructorRef);

    if (instructorDoc.exists()) {
      lessons.push({
        ...doc.data(),
        instructor: instructorDoc.data().name
      });
    } else {
      lessons.push({
        ...doc.data(),
        instructor: null
      });
    }
  });

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
  getAllLessons,
  getAllInstructors,
};