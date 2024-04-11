function stepOne(s, cnt) {
  let str = "";

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "1") {
      str += "1";
    } else cnt++;
  }
  return [str, cnt];
}

function stepTwo(s) {
  return s.length.toString(2);
}

function solution(s) {
  let stepCnt = 0;
  let zeroCnt = 0;
  let originLen = s.length;
  while (s !== "1") {
    [s, zeroCnt] = stepOne(s, zeroCnt);
    s = stepTwo(s);
    stepCnt++;
  }
  return [stepCnt, zeroCnt];
}
