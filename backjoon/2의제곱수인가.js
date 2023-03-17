function solution(num) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    if (num & (1 << i)) result++;
    if (result > 1) {
      return console.log("0");
    }
  }

  return result == 1 ? console.log("1") : console.log("0");
}
