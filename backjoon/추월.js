let input = `4
ZG431SN
ZG5080K
ST123D
ZG206A
ZG206A
ZG431SN
ZG5080K
ST123D`.split("\n");

const solution = () => {
  let result = 0;
  const n = Number(input[0]);
  let carObj = {}; // 차 번호 : 뒤 따르는 차들
  let pre = []; //먼저 들어간 차량들 저장
  for (let i = 1; i <= n; i++) {
    const car = input[i];
    carObj[car] = [...pre];
    pre.push(car);
  }
  for (let j = n + 1; j <= 2 * n; j++) {
    const car = input[j];
    const possible = carObj[car];
    for (let k = j + 1; k <= 2 * n; k++) {
      const backword = input[k];
      if (possible.includes(backword)) {
        result++;
        break;
      }
    }
  }
  console.log(result);
};

solution();
