const isNumeric = (n) => Number.isInteger(+n) && n != " ";

const parser = (info) => {
  let result = [];
  let [numInit, numEnd] = [0, info.length];
  for (let i = 0; i < info.length; i++) {
    if (isNumeric(info[i])) {
      numInit = i;
      for (let j = i + 1; j < info.length; j++) {
        if (!isNumeric(info[j])) {
          numEnd = j;
          break;
        }
      }
      break;
    }
  }
  return [
    info.slice(0, numInit).toLowerCase(),
    Number(info.slice(numInit, numEnd)),
  ];
};

function solution(files) {
  files.sort((a, b) => {
    const [aH, aN] = parser(a);
    const [bH, bN] = parser(b);

    if (aH === bH) {
      return aN - bN;
    } else {
      if (aH < bH) return -1;
    }
  });

  return files;
}
