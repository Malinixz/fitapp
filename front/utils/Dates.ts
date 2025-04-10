import {format, parseISO} from "date-fns"

export function convertToDate(dateString : string): Date {
    // Divida a string no formato DD/MM/YYYY
    const [day, month, year] = dateString.split('/');

    // Cria um objeto Date no formato YYYY-MM-DD
    return new Date(`${year}-${month}-${day}`);
}

export function convertToString(date : Date): string {
    const ano = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Adiciona 1 ao mês porque janeiro é 0
    const dia = String(date.getDate()).padStart(2, '0');

    // Retorna a data formatada como string no formato YYYY-MM-DD
    return `${ano}-${mes}-${dia}`;
}

export function formatDate(dateString : string) {
    // Formata string YYYY-MM-DD para DD/MM/YYYY
    const date = (parseISO(dateString))
    return format(date, 'dd/MM/yyyy')
}