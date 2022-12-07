function solution(arr) {
  let answer = 1;
  let dividors = [2];

  const validator = (num) => {
    for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  //100이하의 소수 찾기 for 서로수
  for (let i = 3; i <= 50; i++) {
    validator(i) ? dividors.push(i) : null;
  }
  console.log(dividors);

  let seorosoo = Array.from({ length: arr.length }, () => []);
  [2, 6, 8, 14][([], [], [], [])];
  arr.forEach((num, index) => {
    dividors.forEach((d) => {
      while (true) {
        if (num % d === 0) {
          num /= d;
          seorosoo[index].push(d);
          continue;
        } else break;
      }
    });
  });
  [[2], [2, 3], [2, 2, 2], [2, 7]];

  let overObj = {};
  seorosoo.forEach((numbers) => {
    numbers = [2, 2, 2];
    let obj = {};
    numbers.forEach((num) => {
      if (obj[num]) {
        obj[num]++;
      } else {
        obj[num] = 1;
      }
    });
    obj = { 2: 1 };

    Object.keys(obj).forEach((key) => {
      if (overObj[key]) {
        obj[key] > overObj[key] ? (overObj[key] = obj[key]) : null;
      } else {
        overObj[key] = obj[key];
      }
    });
  });
  Object.keys(overObj).forEach((key) => {
    answer *= Number(key) ** overObj[key];
  });
  return answer;
}
