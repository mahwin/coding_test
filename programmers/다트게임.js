function solution(dartResult) {
  let answer = [];
  let regOne = "SDT";
  let regTwo = "*#";
  let bonusObj = { S: "**1", T: "**3", D: "**2" };
  let dart = [];
  for (let i = 0; i < dartResult.length; i++) {
    if (regOne.includes(dartResult[i])) {
      if (regTwo.includes(dartResult[i + 1])) {
        dart.push(i + 1);
      } else dart.push(i);
    }
  }
  dart = dart.map((n) => n + 1);
  dart.unshift(0);

  for (let i = 0; i < 3; i++) {
    let currentDart = dartResult.slice(dart[i], dart[i + 1]);
    if (regOne.includes(currentDart[currentDart.length - 1])) {
      //옵션이 없는 경우
      const s = currentDart.slice(0, -1);
      const b = currentDart.slice(-1);

      answer[i] = eval(s + bonusObj[b]);
    } else {
      //옵션이 있는 경우
      const s = currentDart.slice(0, -2);
      const b = currentDart.slice(-2, -1);
      const o = currentDart.slice(-1);
      if (o === "*") {
        if (i > 0) {
          answer[i - 1] *= 2;
          answer[i] = 2 * eval(s + bonusObj[b]);
        } else answer[i] = 2 * eval(s + bonusObj[b]);
      } else answer[i] = -1 * eval(s + bonusObj[b]);
    }
  }

  return answer.reduce((pre, cur) => (pre += cur), 0);
}

solution("1S*2T*3S");
