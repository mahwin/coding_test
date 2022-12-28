const solution = (lines) => {
  let answer = 0;
  const arr = [];
  const logPointArr = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split(" ");
    const edSec =
      Number(line[1].substring(0, 2)) * 3600 +
      Number(line[1].substring(3, 5)) * 60 +
      Number(line[1].substring(6, 12));
    const duration = Number(line[2].substring(0, line[2].length - 1));
    const stSec = edSec - duration + 0.001;
    arr.push([stSec, edSec]);
    logPointArr.push(stSec, edSec);
  }

  logPointArr.sort();
  console.log(logPointArr);

  for (let i = 0; i < logPointArr.length; i++) {
    const beginRange = logPointArr[i];
    const endRange = logPointArr[i] + 1;
    let count = 0;
    for (let j = 0; j < arr.length; j++) {
      const stPoint = arr[j][0];
      const edPoint = arr[j][1];

      if (
        (stPoint >= beginRange && stPoint < endRange) ||
        (edPoint >= beginRange && edPoint < endRange) ||
        (stPoint <= beginRange && edPoint >= endRange)
      ) {
        count++;
      }
    }

    if (count > answer) {
      answer = count;
    }
  }
  return answer;
};
