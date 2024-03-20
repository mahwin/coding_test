// 균형잡힌 문자열 => 갯수가 같음
// 올바른 괄호 => 균형 + 짝도 맞음
function solution(p) {
  const isCorrect = (str) => {
    let openCnt = 0;
    for (let i = 0; i < str.length; i++) {
      openCnt += str[i] === "(" ? 1 : -1;
      if (openCnt < 0) return false;
    }
    return true;
  };

  const dfs = (str) => {
    if (str === "") return str;
    if (isCorrect(str)) return str;

    let openCnt = str[0] === "(" ? 1 : -1;

    let p;
    for (let i = 1; i < str.length; i++) {
      openCnt += str[i] === "(" ? 1 : -1;
      if (openCnt === 0) {
        p = i;
        break;
      }
    }

    const [u, v] = [str.slice(0, p + 1), str.slice(p + 1)];

    if (isCorrect(u)) return u + dfs(v);

    return "(" + dfs(v) + ")" + reverseBracket(u);
  };
  return dfs(p);
}

function reverseBracket(str) {
  let reversed = "";
  for (let i = 1; i < str.length - 1; i++) {
    reversed += str[i] == ")" ? "(" : ")";
  }
  return reversed;
}
