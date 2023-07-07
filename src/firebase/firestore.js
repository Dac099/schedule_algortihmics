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

async function deleteInstructor(id){
  await deleteDoc(doc(db, "instructors", id));
}

async function updateInstructor(id, newData){
  await setDoc(doc(db, 'instructors', id), newData);
}

async function getTrialLessons(){
  try {
    const queryDB = query(collection(db, 'trial_lessons'));
    const querySnapshots = await getDocs(queryDB);

    const lessons = querySnapshots.docs.map(doc => {
      const trial_lesson = {
        ...doc.data(),
        id: doc.id
      }

      return trial_lesson;
    });

    return lessons;    
  } catch (error) {
    return error;
  }
}

async function updateTrialLesson(lesson){
  try {
    const id = lesson.id;
    delete lesson.id;
    
    await setDoc(doc(db, 'trial_lessons', id), lesson);
    
  } catch (error) {
    console.log(new Error(error).message);
  }
}

async function deleteTrialLesson(lesson){
  try {
    await deleteDoc(doc(db, "trial_lessons", lesson.id));
  } catch (error) {
    console.log(new Error(error).message);
  }
}

export {
  getAllLessons,
  getAllInstructors,
  addInstructor, 
  addLesson,
  deleteLesson,
  deleteInstructor,
  updateInstructor,
  getTrialLessons,
  updateTrialLesson,
  deleteTrialLesson,
};