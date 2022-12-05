function solution(files) {
  const parser = (str) => {
    let numIdx = [];
    let head, number;

    for (let idx = 0; idx < str.length; idx++) {
      let ch = str[idx];
      if (!!Number(ch) || ch === "0") {
        numIdx.push(idx);
      } else if (numIdx.length !== 0) {
        break;
      }
    }

    head = str.slice(0, numIdx[0]).toLowerCase();
    number = Number(str.slice(numIdx[0], numIdx[numIdx.length - 1] + 1));
    console.log(number);
    return [head, number];
  };

  files.sort((a, b) => {
    let [headA, numberA] = parser(a);
    let [headB, numberB] = parser(b);
    console.log(numberA, numberB);
    if (headA > headB) return 1;
    if (headA < headB) return -1;
    if (numberA > numberB) return 1;
    if (numberA < numberB) return -1;
  });
  return files;
}

console.log(solution(["a 123-123", " b 123-44 ", " 3", " 6"]));
