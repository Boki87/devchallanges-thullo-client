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
