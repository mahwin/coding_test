// 균형잡힌 => ( ,)의 갯수가 같다.
// 올바른 괄호는 갯수도 같고 짝도 맞다.

const checkBalance = (u) => {
  let stack = [];
  for (let i = 0; i < u.length; i++) {
    const cur = u[i];
    if (!stack.length) {
      stack.push(cur);
      continue;
    }
    if (stack.at(-1) == "(" && cur === ")") stack.pop();
    else stack.push(cur);
  }
  return stack.length == 0 ? true : false;
};

const sperateUAndV = (p) => {
  let cnt = [0, 0];
  for (let i = 0; i < p.length; i++) {
    if (p[i] == ")") cnt[0]++;
    else cnt[1]++;
    if (cnt[0] === cnt[1]) return [p.slice(0, i + 1), p.slice(i + 1)];
  }
};
const reverse = (p) => {
  return p
    .split("")
    .map((el) => (el === ")" ? "(" : ")"))
    .join("");
};

const dfs = (p) => {
  if (p === "") return p;
  const [u, v] = sperateUAndV(p);
  if (checkBalance(u)) return u + dfs(v);
  else {
    return "(" + dfs(v) + ")" + reverse(u.slice(1, u.length - 1));
  }
};

function solution(p) {
  return dfs(p);
}
