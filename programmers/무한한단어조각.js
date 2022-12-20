// function solution(strs, t) {
//   var answer = Infinity;

//   // [실행] 버튼을 누르면 출력 값을 볼 수 있습니다.
//   const min = Math.min(...strs);
//   const maxCnt = Math.ceil(strs.length / min);

//   const startAlphaObj = {};
//   strs.forEach((str) => {
//     startAlphaObj[str[0]] = startAlphaObj[str[0]]
//       ? [...startAlphaObj[str[0]], str]
//       : [str];
//   });

//   const dfs = (s, cnt) => {
//     if (cnt > maxCnt || cnt > answer) return;
//     if (s === t) {
//       answer = Math.min(answer, cnt);
//       return;
//     }
//     let nextNode;
//     if (s.length === 0) nextNode = startAlphaObj[t[0]];
//     else nextNode = startAlphaObj[t[s.length]];

//     for (let current of nextNode) {
//       if (t.includes(s + current)) {
//         dfs(s + current, cnt + 1);
//       }
//     }
//   };

//   for (let node of startAlphaObj[t[0]]) {
//     dfs(node, 1);
//   }

//   if (answer === Infinity) return -1;
//   else return answer;
// }

function solution(strs, t) {
  const dp = Array.from({ length: t.length + 1 }, () => 20001);
  const longest = strs.sort((a, b) => b.length - a.length)[0].length;
  dp[0] = 0;
  for (let i = 1; i < dp.length; i++) {
    for (let j = i; j >= Math.max(0, i - longest); j--) {
      console.log(i, j);
      const start = j === 0 ? 0 : j - 1;
      if (strs.includes(t.slice(start, i))) {
        dp[i] = Math.min(dp[i], dp[start] + 1);
      }
    }
  }
  const answer = dp[dp.length - 1];
  return answer === 20001 ? -1 : answer;
}

solution(["ba", "na", "n", "a", "bab"], "banana");
