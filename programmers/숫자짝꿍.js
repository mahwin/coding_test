function solution(X, Y) {
  let answer = "";
  const xObj = counter(X);
  const yObj = counter(Y);
  const xkeys = Object.keys(xObj);
  const ykeys = Object.keys(yObj);
  let Arr = xkeys.filter((x) => ykeys.includes(x));
  const sortedArr = Arr.sort((a, b) => b - a);
  if (sortedArr.length === 0) return "-1";
  if (sortedArr[0] === "0") return "0";
  sortedArr.forEach((key) => {
    if (xObj[key] >= yObj[key]) {
      answer += key.repeat(yObj[key]);
    } else {
      answer += key.repeat(xObj[key]);
    }
  });
  return answer;
}

function counter(string) {
  const Arr = string.split("");
  const obj = {};
  Arr.forEach((num) => {
    obj[num] = obj[num] + 1 || 1;
  });
  return obj;
}

////////////////////////////////

// function solution(X, Y) {
//   const diffandSortArr = [...new Set(X.split(""))]
//     .filter((num) => Y.includes(num))
//     .sort((a, b) => b - a);

//   if (!diffandSortArr.length) return "-1";
//   // 내림차순으로 정렬했는데 제일 앞이 0이면 무조건 '0'
//   if (diffandSortArr[0] === "0") return "0";
// }
