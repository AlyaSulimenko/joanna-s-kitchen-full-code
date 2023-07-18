export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const dateToString = (date) => {
  const dateString =
    new Date(date).getDate() +
    " " +
    months[new Date(date).getMonth()] +
    " " +
    new Date(date).getFullYear();
  return dateString;
};
