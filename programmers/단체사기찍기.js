// {A, C, F, J, M, N, R, T}
// N(네오) => P(프로도)와 함께
// R(라이언) => T(튜브)랑 3칸 이상 떨어져

function solution(n, data) {
  let result = 0;
  let len = 8;
  const kakao = ["A", "C", "F", "J", "M", "N", "R", "T"];
  const v = Array.from({ length: len }, () => false);
  const tmp = [];
  data = data.map((el) => [
    kakao.indexOf(el[0]),
    kakao.indexOf(el[2]),
    el[3],
    +el[4],
  ]);

  const check = () => {
    for (const [a, b, com, dis] of data) {
      const aI = tmp.indexOf(a);
      const bI = tmp.indexOf(b);
      const d = Math.abs(aI - bI) - 1;
      if (com === "=") {
        if (d !== 0) return false;
      } else if (com === "<") {
        if (d >= dis) return false;
      } else if (com === ">") {
        if (d <= dis) return false;
      }
    }
    return true;
  };

  const dfs = () => {
    if (tmp.length === len) {
      if (check()) {
        result++;
      }

      return;
    }

    for (let i = 0; i < len; i++) {
      if (!v[i]) {
        v[i] = true;
        tmp.push(i);
        dfs();
        tmp.pop();
        v[i] = false;
      }
    }
  };
  dfs();
  return result;
}

console.log(solution(2, ["N~F=0", "R~T>2"]));
console.log(solution(2, ["M~C<2", "C~M>1"]));
