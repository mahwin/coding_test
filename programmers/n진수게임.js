const transfer = (number, n) => {
  if (number === 0) return 0;
  let tmp = "0123456789ABCDEF";
  if (n === 10) return n;
  let arr = [];
  while (number) {
    let remainer = number % n;
    arr.push(tmp[remainer]);
    number = Math.floor(number / n);
  }
  return arr.reverse().join("");
};

function solution(n, t, m, p) {
  // 진법 n, 미리 구할 숫자의 갯수 t, 게임에 참가하는 인원 m, 튜브의 순서 p
  const targetIndex = [];
  for (let i = 0; i < t; i++) {
    targetIndex.push(p - 1 + m * i);
  }
  let answer = "0";
  let num = 1;
  while (answer.length < t * m + p) {
    answer += transfer(num, n);
    num++;
  }

  return targetIndex.map((s) => answer[s]).join("");
}

console.log(solution(2, 4, 2, 1));
