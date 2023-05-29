let input = `3
4
1 2 1 2`.split("\n");

const isIn = (possible, recommend) => {
  for (let j = 0; j < possible.length; j++) {
    if (possible[j][0] === recommend) {
      return j;
    }
  }
  return -1;
};

const remove = (possible) => {
  const addIdx = possible.map((el, i) => [el[1], i]);
  const targetIdx = addIdx.sort((a, b) => a[0] - b[0])[0][1];
  return possible.slice(0, targetIdx).concat(possible.slice(targetIdx + 1));
};

const solution = () => {
  const maxLen = +input[0];
  let possible = [];
  const n = Number(input[1]);
  input = input[2].split(" ").map(Number);
  for (let i = 0; i < n; i++) {
    const recommend = input[i];
    const isInIdx = isIn(possible, recommend); // -1이면 없음 0이상은 있음
    if (isInIdx > -1) {
      possible[isInIdx][1]++;
      continue;
    }

    //안에 없다
    if (possible.length < maxLen) {
      possible.push([recommend, 0]);
    } else {
      possible = remove(possible);
      possible.push([recommend, 0]);
    }
  }
  return possible
    .map((el) => el[0])
    .sort((a, b) => a - b)
    .join(" ");
};

console.log(solution());
