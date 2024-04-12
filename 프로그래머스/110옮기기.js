function solution(s) {
  return s.map((el) => search(el));
}

function search(s) {
  let oneoneZeroCnt = 0;
  const len = s.length;
  const remainder = [];
  for (let i = 0; i < len; i++) {
    if (remainder.length < 2) {
      remainder.push(s[i]);
      continue;
    }

    if (remainder.at(-1) === "1" && remainder.at(-2) === "1" && s[i] === "0") {
      remainder.pop();
      remainder.pop();
      oneoneZeroCnt++;
    } else remainder.push(s[i]);
  }

  s = remainder.join("");

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "1" && s[i + 1] === "1") {
      return s.slice(0, i) + "110".repeat(oneoneZeroCnt) + s.slice(i);
    }
  }

  return s[s.length - 1] === "1"
    ? s.slice(0, -1) + "110".repeat(oneoneZeroCnt) + "1"
    : s + "110".repeat(oneoneZeroCnt);
}
