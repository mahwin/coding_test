function solution(numbers) {
  numbers = numbers.map((el) => String(el));
  numbers.sort((a, b) => {
    return b + a - (a + b);
  });
  return numbers[0] === "0" ? "0" : result.join("");
}
