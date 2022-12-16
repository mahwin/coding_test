const binary = (n, num) => {
  let tmp = [];
  while (num) {
    tmp.push(num % 2);
    num = Math.floor(num / 2);
  }
  return tmp.reverse().join("").padStart(n, "0");
};

function solution(n, arr1, arr2) {
  const newArr1 = [];
  const newArr2 = [];
  arr1.forEach((num) => newArr1.push(binary(n, num)));
  arr2.forEach((num) => newArr2.push(binary(n, num)));

  let answer = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => "#")
  );

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (newArr1[row][col] === "0" && newArr2[row][col] === "0")
        answer[row][col] = " ";
    }
  }
  return answer.map((a) => a.join(""));
}

console.log(solution(5, [9, 20, 28, 18, 11], [30, 1, 21, 17, 28]));
