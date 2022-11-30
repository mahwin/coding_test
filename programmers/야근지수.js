function solution(n, works) {
  if (works.reduce((pre, cur) => (pre += cur), 0) < n) return 0;
  let worksObj = {};

  works.forEach((work) => (worksObj[work] = (worksObj[work] || 0) + 1));
  let keys = Object.keys(worksObj).sort((a, b) => a - b);
  let initKey = keys[keys.length - 1];
  while (n > 0) {
    let max = worksObj[initKey];
    if (max > n) {
      worksObj[initKey] = max - n;
      worksObj[initKey - 1] = (worksObj[initKey - 1] || 0) + n;
      n = 0;
    } else {
      worksObj[initKey] = 0;
      worksObj[initKey - 1] = (worksObj[initKey - 1] || 0) + max;
      n -= max;
    }
    initKey--;
  }

  return Object.keys(worksObj).reduce(
    (pre, key) => (pre += Number(key) ** 2 * worksObj[key]),
    0
  );
}

console.log(solution(4, [5, 3, 1]));
