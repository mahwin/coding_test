function sortedByAlpha(route1, route2) {
  for (let i = 0; i < route1.length; i++) {
    const r1 = route1[i];
    const r2 = route2[i];
    if (r1 === r2) continue;
    return r1 > r2 ? route2 : route1;
  }
}

function solution(tickets) {
  const v = Array.from({ length: tickets.length }, () => false);

  let result = null;

  const dfs = (route) => {
    if (route.length === tickets.length + 1) {
      if (!result) result = route;
      else if (result.join("") > route.join("")) {
        result = route;
      }
      return;
    }

    for (let i = 0; i < tickets.length; i++) {
      if (v[i]) continue;
      if (tickets[i][0] === route.at(-1)) {
        v[i] = true;
        dfs(route.concat(tickets[i][1]));
        v[i] = false;
      }
    }
  };

  dfs(["ICN"]);
  return result;
}
