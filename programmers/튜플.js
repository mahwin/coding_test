function solution(s) {
  s = s.slice(2, s.length - 2); // 시작과 끝의 {{ }} 빼기
  s = s.split("},{");

  if (s.length == 1) return s.map(Number);
  const result = new Set();

  s.sort((a, b) => a.length - b.length);
  s.forEach((el) => {
    el.split(",")
      .map(Number)
      .forEach((num) => result.add(num));
  });
  return [...result];
}
