import { collection, doc, getDocs, getFirestore, query, getDoc } from 'firebase/firestore';
import { app } from './firebase_sdk';

const db = getFirestore(app);

async function getAllLessons(){
  const queryDB = query(collection(db, 'lessons'));
  const querySnapshot = await getDocs(queryDB);
  const lessons = [];

  const promises = querySnapshot.docs.map(async doc => {
    const instructorRef = doc.data().instructor;
    const instructorDoc = await getDoc(instructorRef);

    if (instructorDoc.exists()) {
      const instructorData = instructorDoc.data();
      return {
        ...doc.data(),
        instructor: instructorData.name
      };
    } else {
      return {
        ...doc.data(),
        instructor: ''
      };
    }
  });

  const results = await Promise.all(promises);
  lessons.push(...results);

  return lessons;
}

async function getAllInstructors(){
  const queryDB = query(collection(db, 'instructors'));
  const querySnashot = await getDocs(queryDB);
  let instructors = [];

  instructors = [...querySnashot.docs.map(doc => doc.data())];

  return instructors;
}

export {
  getAllLessons,
  getAllInstructors,
};