const checkDot = (str) => {
  if (str[0] === ".") str = str.slice(1);
  if (str[str.length - 1] === ".") str = str.slice(0, str.length - 1);
  return str;
};

function solution(new_id) {
  //s1
  new_id = new_id.toLowerCase();
  //s2
  new_id = new_id.replace(/[^a-z0-9-_.]/g, "");
  //s3
  new_id = new_id.replace(/[.]{2,}/g, ".");
  //s4
  new_id = checkDot(new_id);
  //s5
  if (new_id === "") new_id = "a";
  //s6
  if (new_id.length >= 16) {
    new_id = new_id.slice(0, 15);
    new_id = checkDot(new_id);
  }
  //s7
  if (new_id.length <= 2) {
    new_id = new_id.padEnd(3, new_id[new_id.length - 1]);
  }
  return new_id;
}
