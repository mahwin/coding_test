// 정확성 O, 효율성 X
let result = [0, Infinity];
const graph = {};
const summitObj = {};
let gateObj = {};
let v;
const dfs = (node, intensity) => {
  if (summitObj[node]) {
    if (intensity < result[1]) {
      result = [node, intensity];
    } else if (intensity == result[1] && node < result[0]) {
      result[0] = node;
    }
    return;
  }
  if (!graph[node]) return;

  for (const [next, nextInten] of graph[node]) {
    if (v[next]) continue;
    v[next] = true;
    dfs(next, Math.max(intensity, nextInten));
    v[next] = false;
  }
};
function solution1(n, paths, gates, summits) {
  v = Array.from({ length: n + 1 }, () => false);
  summits.forEach((summit) => (summitObj[summit] = true));
  gates.forEach((gate) => (v[gate] = true));

  paths.forEach(([from, to, intensity]) => {
    //양방향
    graph[from] = graph[from]
      ? graph[from].concat([[to, intensity]])
      : [[to, intensity]];
    graph[to] = graph[to]
      ? graph[to].concat([[from, intensity]])
      : [[from, intensity]];
  });

  gates.forEach((start) => {
    dfs(start, 0);
  });

  return result;
}

// queue 추가

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }

  enqueue(val) {
    this.queue[this.rear++] = val;
  }

  dequeue() {
    const val = this.queue[this.front];
    delete this.queue[this.front++];
    return val;
  }

  isEmpty() {
    return this.front === this.rear;
  }
}

function solution(n, paths, gates, summits) {
  const q = new Queue();
  const graph = {};
  const summitObj = {};
  const gateObj = {};
  const dp = Array.from({ length: n + 1 }, () => 10000001);
  dp[0] = 0;

  summits.forEach((summit) => (summitObj[summit] = true));
  gates.forEach((gate) => {
    q.enqueue({ node: gate, intensity: 0 }); // gate 번호와 intensity 0
    gateObj[gate] = true;
    dp[gate] = 0;
  });

  paths.forEach(([from, to, intensity]) => {
    //양방향
    graph[from] = graph[from]
      ? graph[from].concat([[to, intensity]])
      : [[to, intensity]];
    graph[to] = graph[to]
      ? graph[to].concat([[from, intensity]])
      : [[from, intensity]];
  });

  while (!q.isEmpty()) {
    const { node: current, intensity: currIntensity } = q.dequeue();
    if (summitObj[current] || !graph[current]) continue;

    for (const [next, nextIntensity] of graph[current]) {
      const maxIntensity =
        currIntensity > nextIntensity ? currIntensity : nextIntensity;
      if (maxIntensity < dp[next]) {
        dp[next] = maxIntensity;
        q.enqueue({ node: next, intensity: maxIntensity });
      }
    }
  }
  // let result = [0, Infinity];
  // for (const summit of summits) {
  //   const intensity = dp[summit];
  //   if (result[1] < intensity) continue;
  //   if (result[1] > intensity) result = [summit, intensity];
  //   else if (result[0] > summit) result[0] = summit;
  // }
  // return result;

  return dp
    .filter((v, i) => summitObj[i])
    .map((v, i) => [summits[i], v])
    .sort((a, b) => a[1] - b[1])
    .filter((v, _, arr) => v[1] === arr[0][1])
    .sort((a, b) => a[0] - b[0])[0];
}

console.log(
  solution(
    5,
    [
      [1, 3, 10],
      [1, 4, 20],
      [2, 3, 4],
      [2, 4, 6],
      [3, 5, 20],
      [4, 5, 6],
    ],
    [1, 2],
    [5]
  )
);
