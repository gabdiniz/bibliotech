import { doc, getDocs, setDoc } from "firebase/firestore";
import { usuariosCollection } from "./collections";

export async function novoUsuario(data) {
  const docRef = doc(usuariosCollection, data.uid);
  await setDoc(docRef, { ...JSON.parse(JSON.stringify(data)) });
}

export async function getUsuarios() {
  const snapshot = await getDocs(usuariosCollection);
  let usuarios = [];
  snapshot.forEach(doc => {
    usuarios.push({ ...doc.data(), id: doc.id });
  })
  return usuarios;
}