// Función para obtener la fecha actual en formato MySQL (YYYY-MM-DD)
export const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};
