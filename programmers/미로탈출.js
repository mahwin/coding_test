const getCombination = (arr, pick) => {
  let result = [];
  if (pick === 1) return arr.map((el) => [el]);

  arr.forEach((fixed, index) => {
    const tmp = getCombination(arr.slice(index + 1), pick - 1);
    tmp.map((el) => result.push([fixed, ...el]));
  });
  return result;
};

function solution(n, start, end, roads, traps) {
  //트랩이 10개 밖에 안되니, 조합으로 모든 종류의 그래프를 그리고 상황에 맞춰서 그래프 사용하자.
  let trapObj = {};
  for (let pick = 0; pick <= traps.length; pick++) {
    let trapCombis = getCombination(traps, pick);
    trapCombis.push([[]]);
    trapCombis.forEach((el) => {
      let key = el.join(",");

      let graph = {};

      for (let i = 1; i <= n; i++) {
        graph[i] = {};
      }

      roads.forEach(([from, to, cost]) => {
        if (el.includes(from) ^ el.includes(to)) {
          [from, to] = [to, from];
        }

        if (graph[from][to]) {
          graph[from][to] > cost ? (graph[from][to] = cost) : null;
        } else {
          graph[from][to] = cost;
        }
      });
      trapObj[key] = graph;
    });
  }
  traps = traps.map(String);
  let trapStatus = new Set();
  let queue = [[start, 0, trapStatus]];
  let answer = Infinity;
  while (queue.length) {
    const [currentNode, currentCost, trapStatus] = queue.shift();
    if (Number(currentNode) === end) {
      answer = Math.min(currentCost, answer);
    }

    if (currentCost >= answer) continue;

    if (traps.includes(currentNode)) {
      trapStatus.has(currentNode)
        ? trapStatus.delete(currentNode)
        : trapStatus.add(currentNode);
    }
    let key = [...trapStatus].sort((a, b) => a - b).join(",");

    if (trapObj[key][currentNode] === undefined) continue;

    for (const [next, cost] of Object.entries(trapObj[key][currentNode])) {
      queue.push([next, currentCost + cost, trapStatus]);
    }
  }

  return answer;
}
