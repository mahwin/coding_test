function solution(begin, target, words) {
  let result = Infinity;

  const canCheck = (word1, word2) => {
    let diffCnt = 0;

    for (let i = 0; i < word1.length; i++) {
      if (word1[i] !== word2[i]) diffCnt++;
    }

    return diffCnt === 1;
  };

  const v = Array.from({ length: words.length }, () => false);

  const dfs = (wordArr, cnt) => {
    if (wordArr.join("") === target) {
      result = Math.min(result, cnt);
      return;
    }

    for (let i = 0; i < words.length; i++) {
      if (v[i]) continue;
      if (!canCheck(wordArr, words[i])) continue;
      v[i] = true;
      dfs(words[i].split(""), cnt + 1);
      v[i] = false;
    }
  };
  const wordArr = begin.split("");
  dfs(wordArr, 0);
  return result === Infinity ? 0 : result;
}
