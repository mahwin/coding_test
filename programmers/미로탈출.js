const d = Array.from({ length: 1024 }, () =>
  Array.from({ length: 1004 }, () => Infinity)
);

const adj = Array.from({ length: 1004 }, () => []);
const adjRev = Array.from({ length: 1004 }, () => []);
const trapIdx = Array.from({ length: 1004 }, () => -1);

const bitmask = (state, idx) => {
  return (1 << trapIdx[idx]) & state;
};

function solution(n, start, end, roads, traps) {
  roads.forEach(([from, to, cost]) => {
    adj[from].push([to, cost]);
    adjRev[to].push([from, cost]);
  });

  for (let i = 0; i < traps.length; i++) {
    trapIdx[traps[i]] = i;
  }
  d[start][0] = 0;
  const queue = [[d[start][0], start, 0]];

  let val, idx, state, nextState;
  while (queue.length) {
    distanceArr = queue.map((el) => el[0]);

    const smallIdx = distanceArr.indexOf(Math.min(...distanceArr));

    [val, idx, state] = queue[smallIdx];

    queue.splice(smallIdx, 1);
    if (idx === end) return val;

    if (d[idx][state] !== val) continue;

    for (const [next, dist] of adj[idx]) {
      rev = 0;
      if (trapIdx[idx] !== -1 && bitmask(state, idx)) rev ^= 1;
      if (trapIdx[next] !== -1 && bitmask(state, next)) rev ^= 1;

      if (rev) continue;
      nextState = state;
      if (trapIdx[next] !== -1) nextState ^= 1 << trapIdx[next];

      if (d[next][nextState] > dist + val) {
        d[next][nextState] = dist + val;
        queue.push([d[next][nextState], next, nextState]);
      }
    }

    for (const [next, dist] of adjRev[idx]) {
      rev = 0;
      if (trapIdx[idx] !== -1 && bitmask(state, idx)) rev ^= 1;
      if (trapIdx[next] !== -1 && bitmask(state, next)) rev ^= 1;

      if (!rev) continue;
      nextState = state;
      if (trapIdx[next] !== -1) nextState ^= 1 << trapIdx[next];

      if (d[next][nextState] > dist + val) {
        d[next][nextState] = dist + val;
        queue.push([d[next][nextState], next, nextState]);
      }
    }
  }

  return -1;
}

console.log(
  solution(
    3,
    1,
    3,
    [
      [1, 2, 2],
      [3, 2, 3],
    ],
    [2]
  )
);
