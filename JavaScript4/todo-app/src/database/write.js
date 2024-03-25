// src/database/write.js
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./config";

export async function save(data) {
  try {
    const docRef = await addDoc(collection(db, "tasks"), data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error("Failed to add task. Please try again later.");
  }
}

export async function update(id, data) {
  try {
    const docRef = doc(db, "tasks", id);
    await updateDoc(docRef, data);
    return true;
  } catch (error) {
    console.error("Error updating document: ", error);
    throw new Error("Failed to update task. Please try again later.");
  }
}

export async function remove(id) {
  try {
    const docRef = doc(db, "tasks", id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error removing document: ", error);
    throw new Error("Failed to remove task. Please try again later.");
  }
}
