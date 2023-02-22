function solution(bridge_length, weight, truck_weights) {
  let time = 0;
  let pointer = 0;
  let queue = [];
  let sum = 0;
  while (pointer < truck_weights.length || queue.length !== 0) {
    if (queue[0] && queue[0][1] === bridge_length) {
      const [w, _] = queue.shift();
      sum -= w;
    }

    if (sum + truck_weights[pointer] <= weight) {
      queue.push([truck_weights[pointer], 0]);
      sum += truck_weights[pointer];
      pointer++;
    }

    queue = queue.map((el) => [el[0], el[1] + 1]);
    time++;
  }

  return time;
}

console.log(solution(2, 10, [7, 4, 5, 6]));
