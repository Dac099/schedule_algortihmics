import { storage } from './firebase_sdk';
import { uploadBytes, ref } from 'firebase/storage';

export async function UploadImage(file, file_name){
  const file_ref = ref(storage, file_name);

  const file_data = await uploadBytes(file_ref, file);

  return file_data;
}