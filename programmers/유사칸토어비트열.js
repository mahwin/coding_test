function solution(n, l, r) {
  let kanto = "11011";

  const oneCounter = (index) => {
    let answer = 0;
    if (index <= 5)
      return kanto
        .slice(0, index)
        .split("")
        .filter((num) => num === "1").length;

    let basement = 1;
    while (5 ** (basement + 1) < index) {
      basement++;
    }

    let quotient = Math.floor(index / 5 ** basement);
    let remainder = index % 5 ** basement;

    answer += quotient * 4 ** basement;
    if (quotient >= 3) answer -= 4 ** basement;
    if (quotient === 2) return answer;
    else return answer + oneCounter(remainder);
  };

  return oneCounter(r) - oneCounter(l - 1);
}

console.log(solution(4, 27, 68));

// 26 => 17
// 68 => 32
