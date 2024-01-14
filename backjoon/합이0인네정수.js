function random() {
  return parseInt(Math.random() * 2 ** 28 * 2 - 2 ** 28);
}

const n = 4000;
const input = [];
for (let i = 0; i < 4000; i += 1) {
  const row = [];
  for (let abcd = 0; abcd < 4; abcd += 1) {
    row.push(random());
  }
  input.push(row);
}

const solutionMap = () => {
  const sumMap = new Map();

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const key = input[i][0] + input[j][1];

      if (sumMap.has(key)) {
        sumMap.set(key, sumMap.get(key) + 1);
      } else sumMap.set(key, 1);
    }
  }

  let result = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const key = -(input[i][2] + input[j][3]);
      if (sumMap.has(key)) {
        result += sumMap.get(key);
      }
    }
  }
  console.log(result);
};

const solutionDict = () => {
  const sumDic = {};

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const key = input[i][0] + input[j][1];
      if (!sumDic[key]) sumDic[key] = 1;
      else sumDic[key] += 1;
    }
  }

  let result = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const key = -(input[i][2] + input[j][3]);
      if (sumDic[key]) result += sumDic[key];
    }
  }

  console.log(result);
};

const main = () => {
  console.time("dictionary");
  solutionDict();
  console.timeEnd("dictionary");
  console.time("map");
  solutionMap();
  console.timeEnd("map");
};

main();
