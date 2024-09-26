const monthNames = [
  "Jan", "Feb", "March", "Apr", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const getFullDate = (databaseDate: Date) => {
  const date = new Date(databaseDate);
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${day} ${monthNames[date.getMonth()]} ${year}`;
}
