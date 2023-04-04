import { db } from "./config";
import { collection } from "firebase/firestore";

export const livrosCollection = collection(db, "livros");
export const emprestimosCollection = collection(db, "emprestimos");
export const postagensCollection = collection(db, "postagens");
export const usuariosCollection = collection(db, "usuarios");