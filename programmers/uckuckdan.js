function solution(e, starts) {
  var answer = [];

  //  시간 복잡도 n * sqrt(n)
  // const getDivisor = (num) => {
  //   if (num === 1) return 1;

  //   let count = 0;
  //   for (let i = 1; i < Math.ceil(Math.sqrt(num)); i++) {
  //     if (num % i === 0) {
  //       count += 2;
  //     }
  //   }
  //   if (Number.isInteger(Math.sqrt(num))) count++;
  //   return count;
  // };
  // for (let i = 1; i <= e; i++) {
  //   divisors.push(getDivisor(i));
  // }

  // 시간 복잡도 n * logn
  const divisors = new Array(e + 1).fill(0);
  for (let i = 1; i <= e; i++) {
    for (let j = i; j <= e; j += i) {
      divisors[j]++;
    }
  }
  let max = -Infinity;

  for (let i = e; i >= 1; i--) {
    if (max <= divisors[i]) {
      max = divisors[i];
      divisors[i] = i;
    } else {
      divisors[i] = divisors[i + 1];
    }
  }

  starts.forEach((start) => answer.push(divisors[start]));
  return answer;
}

solution(10, [1, 1, 1]);
