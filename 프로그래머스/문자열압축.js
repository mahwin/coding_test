function solution(s) {
  let result = s.length;

  for (let i = 1; i <= Math.floor(s.length / 2); i++) {
    let strLength = 0;
    let cnt = 1;

    for (let j = 0; j < s.length; j += i) {
      let isSame = true;

      for (let k = 0; k < i; k++) {
        if (s[j + k] !== s[j + i + k] || s[j + i + k] === undefined) {
          isSame = false;
          break;
        }
      }

      if (isSame) cnt++;
      else {
        strLength += cnt >= 2 ? cnt.toString().length + i : i;
        cnt = 1;
      }
    }

    strLength += s.length % i;

    result = Math.min(result, strLength);
  }
  return result;
}
