import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./config";

export async function save(data) {
  console.log("saving database...", data);

  try {
    const docRef = await addDoc(collection(db, "posts"), data);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
}

export async function update(id, data) {
  console.log("updating database...");

  try {
    //   update like and dislike count
    const docRef = doc(db, "posts", id);
    const removed = await updateDoc(docRef, data);
    console.log("Removed:", removed);
    return true;
  } catch {
    return false;
  }
}

export async function remove(id) {
  console.log("removing database...", id);

  try {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
    return true;
  } catch {
    return false;
  }
}
