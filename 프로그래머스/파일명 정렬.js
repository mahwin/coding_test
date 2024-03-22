function isDigit(char) {
  return /[0-9]/g.test(char);
}

function fileNameSplit(filename) {
  let startPointer, lastPointer;

  for (let i = 0; i < filename.length; i++) {
    const char = filename[i];

    if (isDigit(char)) {
      for (let j = i + 1; j < filename.length; j++) {
        if (isDigit(char)) continue;
        startPointer = i;
        lastPointer = j;
        break;
      }
      break;
    }
  }

  return {
    HEAD: filename.slice(0, startPointer),
    NUMBER: Number(filename.slice(startPointer, lastPointer)),
    TAIL: filename.slice(lastPointer),
  };
}

function solution(files) {
  files = files.map((filename) => ({
    origin: filename,
    split: fileNameSplit(filename.toLowerCase()),
  }));

  return files
    .sort((a, b) => {
      console.log(a.split);
      console.log(b.split);
      if (a.split.HEAD !== b.split.HEAD) {
        return a.split.HEAD > b.split.HEAD ? 1 : -1;
      } else if (a.split.NUMBER !== b.split.NUMBER) {
        console.log(a.split.NUMBER, b.split.NUMBER);
        return a.split.NUMBER - b.split.NUMBER;
      } else {
        return a.split.TAIL > b.split.TAIL ? 1 : -1;
      }
    })
    .map((el) => el.origin);
}
