function solution(tickets) {
  let answer = [];
  let len = tickets.length;
  const visited = Array.from({ length: len }, () => false);

  const dfs = (node, route) => {
    if (route.length === len + 1) {
      answer.push([...route]);
      return;
    }

    for (let i = 0; i < len; i++) {
      if (visited[i]) continue;
      else {
        visited[i] = true;
        if (tickets[i][0] === node) {
          dfs(tickets[i][1], [...route, tickets[i][1]]);
        }
        visited[i] = false;
      }
    }
  };

  dfs("ICN", ["ICN"]);

  return answer.sort()[0];
}

console.log(
  solution([
    ["ICN", "SFO"],
    ["ICN", "ATL"],
    ["SFO", "ATL"],
    ["ATL", "ICN"],
    ["ATL", "SFO"],
  ])
);
