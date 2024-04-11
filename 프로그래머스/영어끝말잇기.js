function solution(n, words) {
  let len = words.length;
  let wordSet = new Set();

  let pre = "";

  for (let i = 0; i < Math.ceil(len / n); i++) {
    let tmpCnt = 0;
    for (let j = i * n; j < len; j++) {
      const curWord = words[j];

      if (pre === "") {
        pre = curWord[curWord.length - 1];
        wordSet.add(curWord);
        tmpCnt++;
        continue;
      }

      if (pre !== curWord[0] || wordSet.has(curWord))
        return [tmpCnt + 1, i + 1];

      wordSet.add(curWord);
      pre = curWord[curWord.length - 1];

      tmpCnt++;
      if (tmpCnt === n) break;
    }
  }

  return [0, 0];
}
