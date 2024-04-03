function searchStartAndEnd(arr, idx, cap) {
  let remainder = cap;
  let startIdx = null;
  for (let i = idx; i >= 0; i--) {
    if (arr[i] === 0) continue;
    if (startIdx === null) startIdx = i;

    let can = Math.min(arr[i], remainder);

    remainder -= can;
    arr[i] -= can;

    if (remainder === 0) return { startIdx, endIdx: i };
  }
  return { startIdx, endIdx: -1 };
}

function solution(cap, n, deliveries, pickups) {
  let d = n - 1;
  let p = n - 1;
  let result = 0;
  while (d != -1 || p != -1) {
    const dObj = searchStartAndEnd(deliveries, d, cap);
    const pObj = searchStartAndEnd(pickups, p, cap);

    if (dObj.startIdx === null && pObj.startIdx === null) break;

    result += (Math.max(dObj.startIdx, pObj.startIdx) + 1) * 2;
    d = dObj.endIdx;
    p = pObj.endIdx;
  }
  return result;
}
