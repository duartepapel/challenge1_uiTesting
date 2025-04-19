/**
 * Converts a Date object to a string in the format DD_MM_YYYY.
 * @param date - The Date object to convert.
 * @returns A string representation of the date.
 */
export function convertDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}_${month}_${year}`;
}