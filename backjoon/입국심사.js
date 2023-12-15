let input = `7 10
3
8
3
6
9
2
4`.split("\n");

const solution = () => {
  const [검사하는사람수, people] = input.shift().split(" ").map(Number);
  input = input.map(Number).sort((a, b) => a - b);

  let answer = Infinity;
  let left = 0;
  let right = input[0] * people;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let tmp = 0;
    for (let i = 0; i < 검사하는사람수; i++) {
      tmp += Math.floor(mid / input[i]);
      if (tmp >= people) break;
    }

    if (tmp >= people) {
      answer = Math.min(answer, mid);
    }
    if (tmp < people) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return answer;
};

console.log(solution());
