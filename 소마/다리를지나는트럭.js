function solution(bridge_length, weight, truck_weights) {
  let time = 1;
  let left = 0;
  let sum = 0;
  let stack = [];
  while (left < truck_weights.length || stack.length) {
    if (
      left < truck_weights.length &&
      stack.length < bridge_length &&
      sum + truck_weights[left] <= weight
    ) {
      stack.push([truck_weights[left], bridge_length]);
      sum += truck_weights[left];
      left++;
    }
    if (stack.length) {
      stack = stack.map((el) => [el[0], el[1] - 1]);
      if (stack[0][1] === 0) {
        const [w, _] = stack.shift();
        sum -= w;
      }
    }
    time++;
  }
  return time;
}
