import { addDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { autoresCollection } from "./collections";


export async function adicionarAutor(data) {
    await addDoc(autoresCollection, data);
}

export async function getAutores() {
    const snapshot = await getDocs(autoresCollection);
    let autores = [];
    snapshot.forEach(doc => {
        autores.push({ ...doc.data(), id: doc.id });
    });
    return autores;
}

export async function getAutor(id) {
    const document = await getDoc(doc(autoresCollection, id));
    return { ...document.data(), id: document.id };
}

export async function updateAutor(id, data) {
    await updateDoc(doc(autoresCollection, id), data);
}