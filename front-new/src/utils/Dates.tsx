export function convertToDate(dateString : string): Date {
    // Divida a string no formato DD/MM/YYYY
    const [day, month, year] = dateString.split('/');

    // Crie um objeto Date no formato YYYY-MM-DD
    return new Date(`${year}-${month}-${day}`);
}