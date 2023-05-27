let input = `5
1 50
5 10
3 20
3 15
3 25`.split("\n");

const solution = () => {
  let result = 0;
  let n = Number(input[0]);
  const carObj = {}; // key 속도 value [내구성,차 번호];
  for (let i = 1; i <= n; i++) {
    [v, w] = input[i].split(" ").map(Number);
    carObj[v] = carObj[v] ? carObj[v].concat([[w, i]]) : [[w, i]];
  }

  for (let key of Object.keys(carObj)) {
    result += carObj[key].sort((a, b) => {
      if (a[0] === b[0]) return b[1] - a[1];
      return b[0] - a[0];
    })[0][1];
  }
  return result;
};

console.log(solution());
