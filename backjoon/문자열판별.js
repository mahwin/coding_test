let input =
  `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
8
aa
aaaa
aaaaaa
aaaaaaaaaa
aaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`.split("\n");

// 백트래킹 정답 84% 시간초과
const solution = () => {
  const target = input[0];
  const n = Number(input[1]);
  let result = 0;
  let wordObj = {};
  for (let i = 2; i < 2 + n; i++) {
    const word = input[i];
    const key = word[0];
    wordObj[key] ? wordObj[key].push(word) : (wordObj[key] = [word]);
  }

  const dfs = (char, idx) => {
    if (char === target) {
      result = 1;
      return;
    }
    if (char.length > target.length || result === 1) return;
    const key = target[idx];
    if (wordObj[key]) {
      for (const word of wordObj[key]) {
        if (
          target.indexOf(char + word) !== -1 &&
          wordObj[target[idx + word.length]]
        ) {
          dfs(char + word, idx + word.length);
        }
      }
    }
  };

  dfs("", 0);
  return result;
};

console.log(solution());
