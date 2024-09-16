export const formatTimeDate = (timestamp) => {
  const date = new Date(timestamp);

  // Format date and time
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Set to true for 12-hour clock
  };

  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate;
};

export const currentAge = (birthYear) => new Date().getFullYear() - birthYear;
