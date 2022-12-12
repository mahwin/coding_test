function solution(tickets) {
  let answer = [];

  let targetCnt = tickets.length + 1;

  let visited = Array.from({ length: targetCnt - 1 }, () => false);

  const dfs = (node, route) => {
    if (route.length === targetCnt) {
      answer.push([...route]);
      return;
    }

    for (let i = 0; i < targetCnt - 1; i++) {
      if (visited[i]) continue;
      else {
        if (tickets[i][0] === node) {
          visited[i] = true;
          route.push(tickets[i][1]);
          dfs(tickets[i][1], route);
          visited[i] = false;
          route.pop();
        }
      }
    }
  };

  dfs("ICN", ["ICN"]);
  answer.sort();
  return answer[0];
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
