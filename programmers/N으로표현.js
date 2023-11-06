function solution(N, number) {
  let setArr = Array.from({ length: 9 }, () => new Set());
  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= i; j++) {
      [...setArr[j]].forEach((num1) => {
        [...setArr[i - j]].forEach((num2) => {
          setArr[i].add(num1 + num2);
          setArr[i].add(Math.floor(num1 / num2));
          setArr[i].add(num1 * num2);
          setArr[i].add(num1 - num2);
        });
      });
    }

    setArr[i].add(Number(String(N).repeat(i)));

    if (setArr[i].has(number)) return i;
  }
  return -1;
}
