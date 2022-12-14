// const getCombination = (arr, pick) => {
//   if (pick === 1) return arr.map((el) => [el]);
//   const result = [];

//   arr.forEach((fixed, index) => {
//     const tmp = getCombination(arr.slice(index + 1), pick - 1);
//     tmp.forEach((el) => result.push([fixed, ...el]));
//   });
//   return result;
// };

// const getPermutation = (arr, pick) => {
//   if (pick === 1) return arr.map((el) => [el]);
//   const result = [];

//   arr.forEach((fixed, index, origin) => {
//     const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
//     const tmp = getPermutation(rest, pick - 1);
//     tmp.forEach((el) => result.push([fixed, ...el]));
//   });
//   return result;
// };

// function solution(ability) {
//   let answer = 0;
//   let targetNum = ability[0].length;
//   let peopleNum = ability.length;

//   const peopleCombis = getCombination(
//     Array.from({ length: peopleNum }, (_, i) => i),
//     targetNum
//   );

//   const pickPermus = getPermutation(
//     Array.from({ length: targetNum }, (_, i) => i),
//     targetNum
//   );

//   for (let people of peopleCombis) {
//     for (let picks of pickPermus) {
//       let sum = 0;
//       for (let i = 0; i < picks.length; i++) {
//         sum += ability[people[i]][picks[i]];
//       }

//       if (answer < sum) answer = sum;
//     }
//   }
//   return answer;
// }

function solution(ability) {
  let answer = Number.MIN_SAFE_INTEGER;
  const peopleNum = ability.length;
  const kindOfSport = ability[0].length;
  const visited = Array.from({ length: peopleNum }, () => false);

  const dfs = (start, sum) => {
    if (start === kindOfSport) {
      answer = Math.max(answer, sum);
    }
    for (let i = 0; i < peopleNum; i++) {
      if (!visited[i]) {
        visited[i] = true;
        dfs(start + 1, sum + ability[i][start]);
        visited[i] = false;
      }
    }
  };
  dfs(0, 0);
  return answer;
}

console.log(
  solution([
    [40, 10, 10],
    [20, 5, 0],
    [30, 30, 30],
    [70, 0, 70],
    [100, 100, 100],
  ])
);
