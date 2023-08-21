const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let n;
const graph = {};
const combis = [];
let result = Infinity;

const sum = (arr, peoples) => {
  return arr.reduce((p, c) => (p += peoples[c]), 0);
};

const isLink = (combi) => {
  const q = [combi[0]];
  const v = Array.from({ length: n + 1 }, () => false);
  v[combi[0]] = true;
  let cnt = 1;
  while (q.length) {
    const node = q.shift();

    for (const next of graph[node]) {
      if (!v[next] && combi.includes(next)) {
        v[next] = true;
        cnt++;
        q.push(next);
      }
    }
  }

  return combi.length === cnt ? true : false;
};

//이분하는 조합 찾기.
//중복 피하기 위해 절반 이하만 채택함 =>  8개 중에 1뽑는 경우는 8개 중에 7개 뽑는 경우와 마찬가지.
const getCombis = (cnt, node, combi) => {
  if (combi.length) combis.push(combi);

  if (cnt >= Math.floor(n / 2)) return;

  for (let i = node; i <= n; i++) {
    getCombis(cnt + 1, i + 1, combi.concat(i));
  }
};

const parser = (info) => info.split(" ").map(Number);

const solution = () => {
  n = Number(input[0]);
  const nums = Array.from({ length: n }, (_, i) => i + 1);
  const peoples = [0, ...parser(input[1])];

  for (let i = 2; i < 2 + n; i++) {
    graph[i - 1] = parser(input[i]).slice(1);
  }

  // 이분하는 조합을 구하고
  getCombis(0, 1, []);
  for (let A of combis) {
    const B = nums.filter((num) => !A.includes(num));
    if (isLink(A) && isLink(B)) {
      result = Math.min(result, Math.abs(sum(A, peoples) - sum(B, peoples)));
    }
  }
  console.log(result === Infinity ? -1 : result);
};

solution();
