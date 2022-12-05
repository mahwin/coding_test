function solution(n, times) {
  times.sort((a, b) => a - b);
  let [left, right] = [0, times[times.length - 1] * n];
  let answer = 0;
  const bs = (left, right) => {
    if (left > right) {
      answer = left;
      return;
    }
    let mid = Math.floor((left + right) / 2);
    const count = times.reduce((pre, cur) => pre + Math.floor(mid / cur), 0);

    if (count >= n) bs(left, mid - 1);
    else {
      left = mid + 1;
      bs(left, right);
    }
  };

  bs(left, right);

  return answer;
}

console.log(solution(5, [5, 8]));
// const inputG = () => {
//   return [
//     Math.floor(5 + Math.random() * 10),
//     Math.floor(3 + Math.random() * 10),
//   ];
// };

// while (true) {
//   let i = inputG();
//   let result1 = solution1(5, i);
//   let result2 = solution2(5, i);
//   if (result1 !== result2) {
//     console.log(i);
//     console.log(result1);
//     console.log(result2);
//     break;
//   }
// }

// 5 [5,8]
// 4,1

// 5 [5,8]
// 3,2
