const getParent = (gen, num) => {
  if (gen === 1) return "Rr";
  let parent = getParent(gen - 1, Math.floor((num - 1) / 4) + 1);
  let cases = ["RR", "Rr", "Rr", "rr"];

  num = (num % 4) - 1;
  if (num < 0) num = 3;
  if (parent === "Rr") return cases[num];
  else return parent;
};

for (let i = 1; i < 17; i++) {
  console.log(getParent(3, i));
}

// function solution(queries) {
//   let answer = [];

//   for (let [gen, num] of queries) {
//     answer.push(getParent(gen, num));
//   }
//   return answer;
// }

// console.log(
//   solution([
//     [3, 8],
//     [2, 2],
//   ])
// );

// 1 => 0
// 2 => 1
// 3 => 2
// 4 => 3
