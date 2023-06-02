function solution(new_id) {
  //step1
  new_id = new_id.toLowerCase();
  //step2
  new_id = new_id.replaceAll(/[^a-z0-9-_.]/gi, "");
  //step3
  new_id = new_id.replaceAll(/[.]{2,}/gi, ".");
  //step4
  if (new_id[0] == ".") new_id = new_id.slice(1);
  if (new_id[new_id.length - 1] == ".")
    new_id = new_id.slice(0, new_id.length - 1);
  //step 5
  if (new_id === "") new_id = "a";
  //step 6
  if (new_id.length > 15) {
    new_id = new_id.slice(0, 15);
    if (new_id[new_id.length - 1] == ".")
      new_id = new_id.slice(0, new_id.length - 1);
  }
  //step 7
  if (new_id.length <= 2) {
    let last = new_id[new_id.length - 1];
    new_id = new_id.padEnd(3, last);
  }
  return new_id;
}
