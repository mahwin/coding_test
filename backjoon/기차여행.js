let input = `8 5
7 5 3 5 4
12 5 8
16 2 1
3 1 5
17 12 17
19 7 5
12 2 19
4 1 3`.split("\n");

function solution() {
  const [N, M] = input.shift().split(" ").map(Number);
  // for 누적합  +2
  const visited = Array.from({ length: N + 2 }, () => 0);

  const routes = input[0].split(" ").map(Number);

  for (let i = 0; i < M - 1; i++) {
    if (routes[i] < routes[i + 1]) {
      visited[routes[i]] += 1;
      visited[routes[i + 1]] -= 1;
    } else {
      visited[routes[i + 1]] += 1;
      visited[routes[i]] -= 1;
    }
  }

  for (let i = 1; i < visited.length; i++) {
    visited[i] += visited[i - 1];
  }
  let cost = BigInt(0);
  for (let i = 1; i < N; i++) {
    const [a, b, c] = input[i].split(" ").map(Number);
    cost += BigInt(Math.min(a * visited[i], b * visited[i] + c));
  }
  console.log(cost.toString());
}

solution();
