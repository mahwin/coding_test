function solution(p) {
  let answer = "";

  const correctCheck = (str) => {
    let count = 0;
    for (let s of str) {
      s === "(" ? count++ : count--;
      if (count < 0) return false;
    }
    if (count === 0) return true;
    else return false;
  };

  const seperator = (w) => {
    let count = 0;
    for (let i = 0; i < w.length; i++) {
      w[i] === "(" ? count++ : count--;
      if (count === 0) return [w.slice(0, i + 1), w.slice(i + 1)];
    }
  };

  const reverse = (str) => {
    return str
      .split("")
      .map((c) => (c === "(" ? ")" : "("))
      .join("");
  };

  const dfs = (w) => {
    if (w === "") return "";
    let [u, v] = seperator(w);

    if (correctCheck(u)) {
      u += dfs(v);
      return u;
    } else {
      let tmp = "(" + dfs(v) + ")";

      tmp += reverse(u.slice(1, u.length - 1));
      return tmp;
    }
  };

  return dfs(p);
}
console.log(solution("))))(((("));
