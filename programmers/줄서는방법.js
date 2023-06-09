function solution(n, k) {
  const people = [];
  let answer = [];
  let check = 0;
  const v = Array.from({ length: n }, () => false);
  const dfs = () => {
    if (answer.length) return;
    if (people.length === n) {
      check++;
      if (check === k) answer = [...people];
      return;
    }
    for (let i = 0; i < n; i++) {
      if (v[i]) continue;
      people.push(i + 1);
      v[i] = true;
      dfs();
      people.pop();
      v[i] = false;
    }
  };
  dfs();
  return answer;
}
