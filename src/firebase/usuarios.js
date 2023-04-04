import { doc, setDoc } from "firebase/firestore";
import { usuariosCollection } from "./collections";

export async function novoUsuario(data) {
  const docRef = doc(usuariosCollection, data.uid);
  await setDoc(docRef, { ...JSON.parse(JSON.stringify(data)) });
}