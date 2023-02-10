function solution(operations) {
  const heap = [];

  for (const oper of operations) {
    const [command, num] = oper.split(" ");
    if (command === "I") {
      heap.push(Number(num));
    } else if (heap.length === 0) continue;
    else if (num === "1") {
      const idx = heap.indexOf(Math.max(...heap));
      heap.splice(idx, 1);
    } else {
      const idx = heap.indexOf(Math.min(...heap));
      heap.splice(idx, 1);
    }
  }
  return heap.length === 0 ? [0, 0] : [Math.max(...heap), Math.min(...heap)];
}
