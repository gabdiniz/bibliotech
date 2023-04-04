import { addDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { postagensCollection } from "./collections";

export async function adicionarPostagem(data) {
    await addDoc(postagensCollection, data);
}

export async function getPostagens() {
    const snapshot = await getDocs(postagensCollection);
    let postagens = [];
    snapshot.forEach(doc => {
        postagens.push({...doc.data(), id: doc.id});
    });
    return postagens;
}

export async function getPostagem(id) {
    const document = await getDoc(doc(postagensCollection, id));
    return {...document.data(), id: document.id};
}

export async function updatePostagem(id, data) {
    await updateDoc(doc(postagensCollection, id), data);
}