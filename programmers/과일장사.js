function solution(k, m, score) {
  const apple = Array.from({ length: k + 1 }, () => 0);
  score.forEach((el) => apple[el]++);
  let money = 0;
  let packing = 0;
  for (let i = k; i >= 0; i--) {
    packing += apple[i];
    if (packing < m) continue;
    else {
      const num = Math.floor(packing / m);
      packing -= m * num;
      money += num * i * m;
    }
  }

  return money;
}
