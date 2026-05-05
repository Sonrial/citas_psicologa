import { db } from './firebase-config.js';
import { collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Función para registrar un paciente
export async function crearPaciente(datosPaciente) {
    try {
        const docRef = await addDoc(collection(db, "pacientes"), {
            ...datosPaciente,
            fecha_creacion: new Date().toISOString()
        });
        console.log("Paciente registrado con ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error al añadir documento: ", e);
    }
}

// Función para leer pacientes
export async function obtenerPacientes() {
    const q = query(collection(db, "pacientes"), orderBy("nombre_completo"));
    const querySnapshot = await getDocs(q);
    const pacientes = [];
    querySnapshot.forEach((doc) => {
        pacientes.push({ id: doc.id, ...doc.data() });
    });
    return pacientes;
}
