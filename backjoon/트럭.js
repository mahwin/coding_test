let input = `10 100 100
10 10 10 10 10 10 10 10 10 10`.split("\n");

const solution = () => {
  let [n, w, L] = input[0].split(" ").map(Number); // n 트럭수, w 다리  길이, L은 최대 하중
  const trucks = input[1].split(" ").map(Number);
  let queue = [];
  let tIdx = 0;
  let time = 0;
  let weight = 0;

  while (tIdx !== n) {
    queue = queue.map((el) => [el[0], el[1] + 1]);
    if (queue.length && queue[0][1] == w) {
      el = queue.shift();
      weight -= el[0];
    }
    if (weight + trucks[tIdx] <= L) {
      weight += trucks[tIdx];
      queue.push([trucks[tIdx], 0]);
      tIdx++;
    }
    time++;
  }

  return time + w - queue.at(-1)[1];
};

console.log(solution());
