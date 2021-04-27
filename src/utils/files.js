import firebase from "firebase/app";
import { createHash } from "crypto";

const generateFileName = (file) => {
  const currentDate = new Date();
  const [name, type] = file.name.split(".");
  const seedToHash = `${name}${file.size}${file.type}${currentDate}`;
  return `${createHash("md5").update(seedToHash).digest("hex")}.${type}`;
};

export const addImageToStorage = (path, image) => {
  image && putFileToStorage(getPathForFile(path, image), image);
  return getPathForFile(path, image);
};

const getPathForFile = (path, file) => {
  const hash = generateFileName(file);
  return `${path}/${hash}`;
};

const putFileToStorage = (path, file) => {
  const fileRef = firebase.storage().ref().child(path);
  fileRef.put(file).catch(console.error);
};

export const removeImageFromStorage = (image) => {
  firebase.storage().ref(image).delete();
};
