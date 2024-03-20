const special = `-_.~!@#$%^&*()=+[{]}:?,<>/`;
const notAllowed = `~!@#$%^&*()=+[{]}:?,<>/`;
const dot = ".";

function solution(new_id) {
  // step 1
  new_id = new_id.toLowerCase();

  // step 2 ~ step 4 허용하는 특수문자만 남기고 .에 대한 처리하기
  const stack = [];

  for (let i = 0; i < new_id.length; i++) {
    const char = new_id[i];
    if (notAllowed.includes(char)) continue;
    if (char === dot) {
      if (stack.length === 0) continue;
      if (stack.at(-1) === ".") continue;
    }

    stack.push(char);
  }

  new_id = stack.at(-1) !== dot ? stack.join("") : stack.slice(0, -1).join("");

  // 5단계
  if (new_id === "") return "aaa";

  // 6 단계
  if (new_id.length >= 16) {
    new_id = new_id[14] === dot ? new_id.slice(0, 14) : new_id.slice(0, 15);
  }

  // 7 단계
  if (new_id.length <= 2) {
    new_id += new_id[new_id.length - 1].repeat(3 - new_id.length);
  }

  return new_id;
}
