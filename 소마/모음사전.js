function solution(word) {
  const arr = ["A", "E", "I", "O", "U"];
  let charSet = new Set();
  const dfs = (char) => {
    if (char.length > 5) return;
    charSet.add(char);

    for (let i = 0; i < 5; i++) {
      dfs(char + arr[i]);
    }
  };
  dfs("");
  console.log(charSet);
  return [...charSet].indexOf(word);
}
