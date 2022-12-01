function solution(begin, target, words) {
  let answer = [];
  if (!words.includes(target)) return 0;

  const isCanChange = (word1, word2) => {
    let count = 0;
    word1.split("").forEach((char) => {
      if (word2.includes(char)) {
        count++;
        word2 = word2.replace(char, "");
      }
    });
    if (count === word1.length - 1) return true;
    return false;
  };

  const dfs = (v) => {
    if (v === target) {
      answer.push(visited.length);
      return;
    }

    for (let next of graph[v]) {
      if (!visited.includes(next)) {
        visited.push(next);
        dfs(next, graph);
        visited.pop();
      }
    }
  };

  let visited = [];
  let graph = {};
  words = [begin, ...words];
  words.forEach((word) => (graph[word] = []));

  for (let key of words) {
    for (let value of words) {
      if (key === value) continue;
      if (isCanChange(key, value)) {
        graph[key].push(value);
      }
    }
  }
  dfs(begin, graph);
  if (answer.length === 0) return 0;
  return Math.min(...answer);
}

console.log(solution("aaa", "aab", ["aad", "aab", "aac"]));
