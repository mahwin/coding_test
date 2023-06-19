const isNumeric = (n) => Number.isInteger(+n) && n != " ";

const parser = (file) => {
  let header = "";
  let number = "";
  for (let i = 0; i < file.length; i++) {
    const cur = file[i];
    if (isNumeric(cur)) {
      for (let j = i; j < file.length; j++) {
        if (isNumeric(file[j])) {
          number += file[j];
        } else return [header.toLowerCase(), Number(number)];
      }
      return [header.toLowerCase(), Number(number)];
    }
    header += cur;
  }
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
