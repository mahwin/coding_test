// function solution(n) {
//   let answer = 0;

//   const combination = (arr, pick) => {
//     if (pick === 1) return arr.map((el) => [el]);
//     let result = [];
//     arr.forEach((fixed, index) => {
//       let combis = combination(arr.slice(index + 1), pick - 1);
//       combis.forEach((el) => result.push(el.concat(fixed)));
//     });
//     return result;
//   };

//   const conversion = (nums, Len) => {
//     let result = Array.from({ length: Len }, () => "(");
//     nums.forEach((num) => (result[num] = ")"));
//     return result;
//   };

//   const check = (convert) => {
//     let cnt = 0;
//     for (let i = 0; i < convert.length; i++) {
//       convert[i] === "(" ? cnt++ : cnt--;
//       if (cnt < 0) return false;
//     }
//     return true;
//   };

//   let arr = Array.from({ length: n * 2 }, (_, i) => i);

//   let combs = combination(arr, n);
//   combs.forEach((nums) => {
//     let convert = conversion(nums, n * 2);
//     answer += check(convert);
//   });
//   return answer;
// }
// console.log(solution(5));

// 카탈란 수 !
// 어떤 회사에 A,B직무의 사람을 합쳐서 10명을 뽑는다고 가정할 때 무조건 A의 직무가 더 많이 뽑는 방법의 수.
// 행렬로 나타내면 B의 수가 무조건 적어야하니까
// 행과 열의 값이 같은 지점 위로는 생각도 안해도됨. B가 더 많은 경우는 안 따질거라.
// 2n!      2n!
// ---  -  -----
// n!n!     (n-1)!(n+1)!

// 앞의 식은 nxn 행렬일 때 최단 거리로 갈 수 있는 모든 경우의 수
// 뒤의 식은 nxn 행렬일 때 특정 위치인 행과 열이 같은 지점 위의 그러니까 항상 A가 더큰 경우에 위배되는 경우의 수
// ex A,B직무 맡은 사람이 15명을 뽑는데 A가 항상 더 많이 뽑히는 전체 채용 방법의 수 중에서도 A 9명  뽑힐 방법의 수는?

function solution(n) {
  let answer = 0;
  const factorial = (num) => {
    return Array.from({ length: num }, (_, i) => i + 1).reduce(
      (pre, cur) => (pre *= cur),
      1
    );
  };

  const allPossible = factorial(n * 2) / factorial(n) ** 2;
  const notPossible = factorial(n * 2) / (factorial(n - 1) * factorial(n + 1));
  console.log(allPossible, notPossible);
  return allPossible - notPossible;
}

solution(3);
