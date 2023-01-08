class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }

  enqueue(data) {
    const node = new Node(data);
    if (!this.head) this.head = node;
    else this.tail.next = node;

    this.tail = node;
    this.size++;
  }
  dequeue() {
    if (!this.head) return null;
    const data = this.head.data;
    this.head = this.head.next;
    this.size--;
    return data;
  }
}

function solution(n, paths, gates, summits) {
  let graph = Array.from({ length: n + 1 }, () => []); //그래프
  const queue = new Queue(); // 큐
  const d = Array.from({ length: n + 1 }, () => Infinity); // 다익스크라 값 배열

  //양방향 그래프
  paths.forEach(([from, to, intensity]) => {
    graph[from].push([to, intensity]);
    graph[to].push([from, intensity]);
  });

  //우선 순위 큐 첫 시작 값
  for (let i = 0; i < gates.length; i++) {
    queue.enqueue([gates[i], 0]);
  }

  while (!queue.isEmpty()) {
    const [node, intensity] = queue.dequeue();

    if (d[node] <= intensity) continue;
    d[node] = intensity;
    if (summits.includes(node)) continue;

    for (let [next, nextIntens] of graph[node]) {
      const nextIntensity = intensity > nextIntens ? intensity : nextIntens;

      if (d[next] <= nextIntensity) continue;
      // d[next] = nextIntensity;
      queue.enqueue([next, nextIntensity]);
    }
  }
  let answer = [0, Infinity];

  for (const summit of summits) {
    if (d[summit] < answer[1]) {
      answer = [summit, d[summit]];
    } else if (d[summit] === answer[1] && summit < answer[0]) {
      answer = [summit, d[summit]];
    }
  }

  return answer;
}

solution(
  6,
  [
    [1, 2, 3],
    [2, 3, 5],
    [2, 4, 2],
    [2, 5, 4],
    [3, 4, 4],
    [4, 5, 3],
    [4, 6, 1],
    [5, 6, 1],
  ],
  [1, 3],
  [5]
);
