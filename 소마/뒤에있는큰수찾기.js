function solution(numbers) {
  let answer = [];
  let last = numbers.length - 1;
  for (let i = 0; i < numbers.length - 1; i++) {
    pointer = i + 1;
    let num = numbers[i];
    while (pointer <= last) {
      if (numbers[pointer] > num) {
        answer.push(numbers[pointer]);
        break;
      }
      pointer++;
    }
    if (answer.length === i) answer.push(-1);
  }
  answer.push(-1);
  return answer;
}
