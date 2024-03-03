function solution(tickets) {
  const graph = {};

  tickets.forEach(([a, b], i) => {
    if (graph[a]) graph[a].push([b, i]);
    else graph[a] = [[b, i]];
  });
  const len = tickets.length + 1;
  let result = [];

  const v = Array.from({ length: tickets.length }, () => false);

  const dfs = (next, route) => {
    if (route.length === len) {
      if (!result.length) result = route;
      else if (result.join("") > route.join("")) {
        result = route;
      }
      return;
    }
    if (!graph[next]) return;

    for (const [n, i] of graph[next]) {
      if (v[i]) continue;
      v[i] = true;
      dfs(n, route.concat(n));
      v[i] = false;
    }
  };

  dfs("ICN", ["ICN"]);

  return result;
}
