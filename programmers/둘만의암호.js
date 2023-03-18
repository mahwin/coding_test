function solution(s, skip, index) {
  let result = "";
  let set = new Set("abcdefghijklmnopqrstuvwxyz");
  skip.split("").forEach((el) => set.delete(el));
  const alphaArr = [...set];
  for (let i = 0; i < s.length; i++) {
    const alpha = s[i];
    let initIdx = alphaArr.indexOf(alpha);
    let cnt = 0;
    while (cnt !== index) {
      initIdx = initIdx + 1 === alphaArr.length ? 0 : initIdx + 1;
      cnt++;
    }
    result += alphaArr[initIdx];
  }
  return result;
}
