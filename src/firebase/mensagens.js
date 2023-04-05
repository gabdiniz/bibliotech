import { addDoc, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";
import { mensagensCollection } from "./collections";

export async function adicionarMensagem(data) {
  await addDoc(mensagensCollection, { ...JSON.parse(JSON.stringify(data)), created: serverTimestamp() });
}

export async function getMensagens() {
  const snapshot = await getDocs(query(mensagensCollection, orderBy('created')));
  let mensagens = [];
  snapshot.forEach(doc => {
    mensagens.push({ ...doc.data(), id: doc.id });
  })
  console.log(mensagens)
  return mensagens;
}