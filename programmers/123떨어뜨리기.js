const splitter = (sum, length) => {
  let result = [];
  while (length--) {
    if (sum - 3 >= length * 3) {
      result.push(3);
      sum -= 3;
    } else if (sum - 2 >= length * 3) {
      result.push(2);
      sum -= 2;
    } else {
      result.push(1);
      sum -= 1;
    }
  }
  return result;
};

function solution(edges, target) {
  const tree = {};
  const visitedTree = {};
  let max = 0;
  let targetIdx = [];
  target.forEach((el, index) => {
    if (el !== 0) {
      targetIdx.push(index);
    }
  });

  edges.forEach(([from, to]) => {
    max = Math.max(from, to, max);
    tree[from] = tree[from] ? [...tree[from], to] : [to];
  });
  for (let [key, values] of Object.entries(tree)) {
    tree[key] = values.sort((a, b) => a - b);
    visitedTree[key] = Array.from({ length: values.length }, () => false);
  }
  let leaf = Array.from({ length: max + 1 }, () => []);

  const dfs = (node, ball) => {
    if (!tree[node]) {
      leaf[node - 1].push(ball);
      return;
    }

    for (let i = 0; i < tree[node].length; i++) {
      const next = tree[node][i];
      if (!visitedTree[node][i]) {
        visitedTree[node][i] = true;
        dfs(next, ball);
        return;
      }
    }
    visitedTree[node] = visitedTree[node].map((el) => false);
    dfs(node, ball);
  };

  let lastBall;
  for (let ballIdx = 0; ballIdx < 10000; ballIdx++) {
    dfs("1", ballIdx);

    let flag = true;
    for (let i of targetIdx) {
      // console.log(i);
      if (target[i] < leaf[i].length) return [-1];
      if (target[i] > leaf[i].length * 3) flag = false;
    }
    lastBall = ballIdx;
    if (flag) break;
  }

  let answer = Array.from({ length: lastBall }, () => 0);

  for (let i of targetIdx) {
    const sum = target[i];
    const idxLength = leaf[i].length;
    const values = splitter(sum, idxLength);
    for (let j = 0; j < idxLength; j++) {
      answer[leaf[i][j]] = values[j];
    }
  }
  return answer;
}

console.log(
  solution(
    [
      [2, 4],
      [1, 2],
      [6, 8],
      [1, 3],
      [5, 7],
      [2, 5],
      [3, 6],
      [6, 10],
      [6, 9],
    ],
    [0, 0, 0, 3, 0, 0, 5, 1, 2, 3]
  )
);
