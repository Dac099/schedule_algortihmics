import { storage } from './firebase_sdk';
import { uploadBytes, ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';

export async function UploadImage(file, file_name){
  const file_ref = ref(storage, file_name);

  const file_data = await uploadBytes(file_ref, file);

  return file_data;
}

export async function getImagesList(){
  const listRef = ref(storage);
  const res = await listAll(listRef);
  const images_url = [];
  
  res.items.forEach((itemRef) => {
    getImageURL(itemRef.fullPath)
    .then((url) => images_url.push({url, path: itemRef.fullPath}))
    .catch(error => console.log(error));
  });

  return images_url;
}

export async function getImageURL(image_path){
  const image_url = await getDownloadURL(ref(storage, image_path));

  return image_url;
}

export async function deleteImage(image_path){
  await deleteObject(ref(storage, image_path));
}