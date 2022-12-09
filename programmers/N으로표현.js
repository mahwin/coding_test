function solution(N, number) {
  // 동적 계획 법을 사용할 수 있는 이유
  // 1. 횟수가 8을 넘어가면 -1 return  시행 횟수가 늘어나면 기하적으로 값이 늘어남. (제한 사항이 있어야 가능)

  let dp = Array.from({ length: 9 }, () => new Set());

  let answer = -1;

  for (let trial = 1; trial <= 8; trial++) {
    let set = new Set([+N.toString().repeat(trial)]);
    for (let i = 1; i < trial; i++) {
      dp[i].forEach((numOne) => {
        dp[trial - i].forEach((numTwo) => {
          set.add(numOne + numTwo);
          set.add(numOne - numTwo);
          set.add(numOne * numTwo);
          set.add(Math.floor(numOne / numTwo));
        });
      });
    }
    if (set.has(number)) return trial;
    dp[trial] = [...set];
  }

  return answer;
}

// function solution(N, number) {
//   var answer = 0;
//   var use = Array.from(new Array(9), () => new Set());
//   if (N == number) return 1;
//   else {
//     use.forEach((element, index) => {
//       if (index !== 0) element.add(Number(String(N).repeat(index)));
//     });
//     for (var i = 1; i <= 8; ++i) {
//       for (var j = 1; j < i; ++j) {
//         for (var first of use[j]) {
//           for (var second of use[i - j]) {
//             use[i].add(first + second);
//             use[i].add(first - second);
//             use[i].add(first * second);
//             use[i].add(first / second);
//           }
//         }
//       }
//       // if (use[i].has(number)) return i;
//     }
//     // return -1;
//   }
//   console.log([...use[5]].length);
//   return answer;
// }

console.log(solution(5, 31168));

// // 8
// // 16 64 1 0 88
// // 96 24 8 9 72 80 8 -8 -7 56 705 108 0 8 512 11 2 0 0 8 888

// 8 * 8;
// 64 - 88 / 8;
