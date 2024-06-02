function solution(bridge_length, weight, truck_weights) {
  let time = 0;
  let w = 0;
  let onBridge = Array.from({ length: bridge_length }, () => 0);
  let tIdx = 0;
  while (tIdx < truck_weights.length || w) {
    const inTruck = truck_weights[tIdx];

    const outTruck = onBridge.shift();
    w -= outTruck;

    if (w + inTruck <= weight) {
      w += inTruck;
      tIdx++;
      onBridge.push(inTruck);
    } else onBridge.push(0);

    time++;
  }

  return time;
}
