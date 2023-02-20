function solution(begin, target, words) {
  const isChangable = (word1, word2) => {
    let cnt = 0;
    word1.split("").forEach((el, i) => {
      if (el === word2[i]) cnt++;
    });
    if (cnt === begin.length - 1) return true;
    else return false;
  };

  const visited = Array.from({ length: words.length }, () => false);
  let min = Infinity;
  const dfs = (char, cnt) => {
    if (char === target) {
      min = Math.min(min, cnt);
      return;
    }

    for (let i = 0; i < words.length; i++) {
      if (visited[i]) continue;
      if (isChangable(char, words[i])) {
        visited[i] = true;
        dfs(words[i], cnt + 1);
        visited[i] = false;
      }
    }
  };
  dfs(begin, 0);
  return min === Infinity ? -1 : min;
}

console.log(solution("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]));
