const work = (arr, idx, cap) => {
  let box = 0;
  while (idx !== -1) {
    if (box + arr[idx] > cap) {
      //현재 위치에 처리할 수 있는 작업보다 해야할 작업 양이 많다면
      const remain = cap - box; // 처리할 수 있는 양
      arr[idx] -= remain;
      break;
    } else {
      box += arr[idx];
      idx--;
    }
  }
  return idx;
};

const findLast = (arr) => {
  for (let i = arr.length - 1; i > -1; i--) {
    if (arr[i]) return i;
  }
  return -1;
};

function solution(cap, n, deliveries, pickups) {
  let dIdx = findLast(deliveries);
  let pIdx = findLast(pickups);
  let answer = 0;

  while (dIdx !== -1 || pIdx !== -1) {
    // 해결해야 할 곳에 조금이라도 남았으면 그 거리에 두 배를 수행해야함.
    answer += Math.max(dIdx, pIdx) * 2 + 2;

    if (dIdx !== -1) dIdx = work(deliveries, dIdx, cap);
    if (pIdx !== -1) pIdx = work(pickups, pIdx, cap);
  }
  return answer;
}
