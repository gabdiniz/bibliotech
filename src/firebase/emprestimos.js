import { addDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { emprestimosCollection } from "./collections";

export async function adicionarEmprestimo(data) {
    await addDoc(emprestimosCollection, data);
}

export async function getEmprestimos() {
    const snapshot = await getDocs(emprestimosCollection);
    let emprestimos = [];
    snapshot.forEach(doc => {
        emprestimos.push({ ...doc.data(), id: doc.id });
    });
    emprestimos.map((e) => {
        if (new Date() > new Date(e.dataEntrega)) updateEmprestimo(e.id, { ...e, status: "Atrasado" })
    })
    return emprestimos;
}

export async function getEmprestimo(id) {
    const document = await getDoc(doc(emprestimosCollection, id));
    return { ...document.data(), id: document.id };
}

export async function updateEmprestimo(id, data) {
    await updateDoc(doc(emprestimosCollection, id), data);
}