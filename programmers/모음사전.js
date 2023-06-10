const dic = ["A", "E", "I", "O", "U"];
function solution(word) {
  let result = 0;
  let answer = 0;
  let tmp = [];
  const dfs = (node) => {
    if (tmp.join("") === word) {
      result = answer;
    }
    answer++;
    if (node > 4) return;
    for (let i = 0; i < dic.length; i++) {
      tmp.push(dic[i]);
      dfs(node + 1);
      tmp.pop();
    }
  };
  dfs(0);
  return result;
}

console.log(solution("I"));
