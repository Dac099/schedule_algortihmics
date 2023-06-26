import { 
  collection, 
  doc, 
  getDocs, 
  getFirestore, 
  query, 
  getDoc,
  addDoc,
  setDoc, 
  where,
  deleteDoc
} from 'firebase/firestore';
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
        instructor: instructorData.name,
        id: doc.id
      };
    } else {
      return {
        ...doc.data(),
        instructor: '',
        id: doc.id
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

  querySnashot.docs.forEach(doc => {
    instructors.push({
      ...doc.data(),
      id: doc.id
    });
  })

  return instructors;
}

async function addInstructor(data){
  const docRef = await addDoc(collection(db, 'instructors'),
    {
      name: data.name,
      phone: data.phone
    }
  );
}

async function addLesson(data){ 
  const newData = {
    ...data, 
    instructor: await getInstructorByName(data.instructor) 
  };
  
  const dataToPush = {...newData};
  delete dataToPush.id;

  if(data.id !== ''){
    const docRef = await setDoc(doc(db, 'lessons', data.id), dataToPush);
  }else{
    delete data.id;
    const docRef = await addDoc(collection(db, 'lessons'), dataToPush);
  }
}

async function getInstructorByName(name){
  const queryDB = query(collection(db, 'instructors'), where('name', '==', name));
  const querySnapshots = await getDocs(queryDB);

  const instructorRef = doc(db, 'instructors', querySnapshots.docs[0].id)

  return instructorRef;
}

async function deleteLesson(lesson_id){
  await deleteDoc(doc(db, 'lessons', lesson_id));
}

async function deleteInstructor(instructor){
  await deleteDoc(doc(db, "instructors", instructor.id));
}
export {
  getAllLessons,
  getAllInstructors,
  addInstructor, 
  addLesson,
  deleteLesson,
  deleteInstructor,
};