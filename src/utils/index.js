export function getInitials(name) {
  let split = name.toUpperCase().split(" ");
  let initials = "";
  if (split.length > 1) {
    initials = split[0][0] + split[1][0];
  } else {
    initials = split[0][0];
  }
  return initials;
}

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function parseDate(date) {
  let d = new Date(date);
  let day = d.getDate();
  let months = [
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
  let month = d.getMonth();
  let year = d.getFullYear();

  return `${day} ${months[month]} ${year}`;
}
