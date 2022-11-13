const convertDate = (timestamp) => {
  const date = Date(parseInt(timestamp, 16)).toString();
  return date.split(" ").slice(1, 4).join("-");
};
module.exports = convertDate;
