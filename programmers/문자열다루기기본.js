function solution(s) {
  let len = s.length;
  if (len !== 4 && len !== 6) return false;

  for (let i = 0; i < len; i++) {
    if (Number.isNaN(parseInt(s[i]))) return false;
  }

  return true;
}

// NaN은 어떤 NaN과도 동일하지 않다.
// 그래서 그 값이 NaN인지 비교하려면
// Object.is(비교하려는 값,NaN)이나 Number.isNaN()을 사용한다.
