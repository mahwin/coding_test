function solution(numbers) {
  numbers = numbers.map(String);

  numbers.sort((a, b) => {
    const ab = a + b;
    const ba = b + a;
    return ab > ba ? -1 : 1;
  });
  return String(BigInt(numbers.join("")));
}
