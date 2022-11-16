function solution(queue1, queue2) {
  const sum = (arr) => {
    return arr.reduce((pre, cur) => (pre += cur), 0);
  };

  let sumQueue1 = sum(queue1);
  let sumQueue2 = sum(queue2);
  const total = sumQueue1 + sumQueue2;

  if (total % 2 === 1) return -1;

  //shift 느려서 뒤집어서 끝에서 부터 pop
  queue1 = queue1.reverse();
  queue2 = queue2.reverse();

  const totalLength = queue1.length + queue2.length;

  let addQueue1 = [];
  let addQueue2 = [];

  let idx = 0;
  let moveNum;
  while (idx <= totalLength + 2) {
    if (sumQueue1 > sumQueue2) {
      if (queue1.length > 0) {
        moveNum = queue1.pop();
      } else {
        moveNum = addQueue1.shift();
      }
      addQueue2.push(moveNum);
      sumQueue1 -= moveNum;
      sumQueue2 += moveNum;
    } else if (sumQueue1 < sumQueue2) {
      if (queue2.length > 0) {
        moveNum = queue2.pop();
      } else {
        moveNum = addQueue2.shift();
      }
      addQueue1.push(moveNum);
      sumQueue2 -= moveNum;
      sumQueue1 += moveNum;
    } else {
      return idx;
    }
    idx++;
  }
  return -1;
}
