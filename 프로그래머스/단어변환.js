function canChange(word1, word2) {
  let diff = 0;
  for (let i = 0; i < word1.length; i++) {
    if (word1[i] !== word2[i]) diff++;
  }
  return diff === 1;
}

function solution(begin, target, words) {
  const v = Array.from({ length: words.length }, () => false);
  let result = Infinity;

  const dfs = (curWord, depth) => {
    if (curWord === target) {
      result = Math.min(depth, result);
      return;
    }

    for (let i = 0; i < words.length; i++) {
      if (v[i]) continue;

      const nextWord = words[i];
      if (canChange(curWord, nextWord)) {
        v[i] = true;
        dfs(nextWord, depth + 1);
        v[i] = false;
      }
    }
  };

  dfs(begin, 0);

  return result === Infinity ? 0 : result;
}
