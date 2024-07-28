function sumArr(arr) {
  return arr.reduce((a, c) => (a += c));
}

function canDivideTwo(num1, num2) {
  return (num1 + num2) % 2 === 0;
}

// [a,b,c,d], [e,f,g,h]
// [a,b,c,d,e,f,g,h] , [] // n번
// [h] [a,b,c,d,e,f,g] 2n -1 번
// 총 3n번 옮기면 전체 경우를 다 확인할 수 있다.

function solution(queue1, queue2) {
  const len = queue1.length;
  let sumQ1 = sumArr(queue1);
  let sumQ2 = sumArr(queue2);

  if (!canDivideTwo(sumQ1, sumQ2)) return -1;

  const target = (sumQ1 + sumQ2) / 2;

  let q1 = 0;
  let q2 = 0;

  let trial = 0;
  let max_trials = len * 3 + 1;

  while (max_trials--) {
    if (sumQ1 === target) return trial;

    if (sumQ1 > target) {
      const popNum = queue1[q1++];
      sumQ1 -= popNum;
      queue2.push(popNum);
    } else {
      const popNum = queue2[q2++];
      sumQ1 += popNum;
      queue1.push(popNum);
    }
    trial++;
  }

  return -1;
}
