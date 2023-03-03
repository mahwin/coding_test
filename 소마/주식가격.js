// function solution(prices) {
//   let stack = [[prices[0], 0]];
//   let result = Array.from({ length: prices.length }, () => 0);
//   for (let i = 1; i < prices.length; i++) {
//     let curP = prices[i];

//     if (stack && stack[stack.length - 1][0] > curP) {
//       let deteleArr = [];

//       stack.forEach(([p, i], k) => {
//         if (p > curP) deteleArr.push(k);
//       });

//       deteleArr = deteleArr.reverse();
//       deteleArr.forEach((j) => {
//         const [i, start] = stack.splice(j, 1)[0];
//         result[start] = i - start;
//       });
//     }
//     stack.push([curP, i]);
//   }
//   const len = prices.length - 1;
//   if (stack.length) {
//     stack.forEach(([p, t]) => {
//       result[t] = len - t;
//     });
//   }

//   return result;
// }

console.log(sol([1, 2, 3, 4, 5, 6, 1, 1, 2, 3, 1, 2, 3]));

function sol(prices) {
  let stack = [];
  let result = Array.from({ length: prices.length }, () => 0);
  for (let i = 0; i < prices.length; i++) {
    let curP = prices[i];
    if (!stack.length) {
      stack.push([curP, i]);
      continue;
    }

    while (stack[stack.length - 1][0] > curP) {
      [_, buyDate] = stack.pop();

      result[buyDate] = i - buyDate;
    }
    stack.push([curP, i]);
  }

  stack.forEach(([_, d]) => {
    result[d] = prices.length - 1 - d;
  });
  return result;
}
