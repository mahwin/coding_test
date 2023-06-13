const L = ["java", "cpp", "python"];
const D = ["backend", "frontend"];
const W = ["junior", "senior"];
const F = ["chicken", "pizza"];

const bs = (arr, num) => {
  let [l, r] = [0, arr.length - 1];
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (arr[mid] >= num) {
      l = mid + 1;
    } else r = mid - 1;
  }
  return l;
};

function solution(info, query) {
  const result = [];
  const infoArr = Array.from({ length: L.length }, () =>
    Array.from({ length: D.length }, () =>
      Array.from({ length: W.length }, () =>
        Array.from({ length: F.length }, () => [])
      )
    )
  );

  info.forEach((infomation) => {
    const [l, d, w, f, score] = infomation.split(" ");
    infoArr[L.indexOf(l)][D.indexOf(d)][W.indexOf(w)][F.indexOf(f)].push(
      Number(score)
    );
  });
  for (let i = 0; i < L.length; i++) {
    for (let j = 0; j < D.length; j++) {
      for (let k = 0; k < W.length; k++) {
        for (let m = 0; m < F.length; m++) {
          infoArr[i][j][k][m] = infoArr[i][j][k][m].sort((a, b) => b - a);
        }
      }
    }
  }
  query.forEach((q) => {
    const [l, d, w, fAndScore] = q.split(" and ");
    const [f, score] = fAndScore.split(" ");

    const lArr = l === "-" ? [0, 1, 2] : [L.indexOf(l)];
    const dArr = d === "-" ? [0, 1] : [D.indexOf(d)];
    const wArr = w === "-" ? [0, 1] : [W.indexOf(w)];
    const fArr = f === "-" ? [0, 1] : [F.indexOf(f)];

    let people = 0;
    for (const i of lArr) {
      for (const j of dArr) {
        for (const k of wArr) {
          for (const m of fArr) {
            people += bs(infoArr[i][j][k][m], Number(score));
          }
        }
      }
    }
    result.push(people);
  });
  return result;
}
