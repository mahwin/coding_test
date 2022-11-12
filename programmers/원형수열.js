function solution(elements) {
  let answer = new Set();

  for (let idx in elements) {
    let arr = elements.slice(idx).concat(elements.slice(0, idx));
    let sum = 0;
    for (let a of arr) {
      sum += a;
      answer.add(sum);
    }
  }
  return answer.size;
}
