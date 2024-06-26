export default function convertTo12HourFormat(timeString) {
  const [hours24, minutes] = timeString
    .split(":")
    .map((num) => parseInt(num, 10));

  const period = hours24 >= 12 ? "PM" : "AM";

  let hours12 = hours24 % 12;
  hours12 = hours12 === 0 ? 12 : hours12; 

  const formattedTime = `${hours12}:${
    minutes < 10 ? "0" + minutes : minutes
  } ${period}`;

  return formattedTime;
}
