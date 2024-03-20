function fillMenuSet(order, depth, set) {
  const combis = [];

  const dfs = (next, combi, pick) => {
    if (pick === depth) {
      set.add(combi.split("").sort().join(""));
      return;
    }

    if (next === order.length) return;

    dfs(next + 1, combi + order[next], pick + 1);
    dfs(next + 1, combi, pick);
  };

  dfs(0, "", 0);
  return combis;
}

function solution(orders, course) {
  const result = [];
  const menuObj = {};

  for (const menuLen of course) {
    let menuSet = new Set();
    let tmpResult = [];
    for (let i = 0; i < orders.length; i++) {
      fillMenuSet(orders[i], menuLen, menuSet);
    }

    let menuMax = 0;
    let tmpMenu = [];
    for (const menus of [...menuSet]) {
      let cnt = 0;

      for (const order of orders) {
        if (isIncludes(order, menus)) cnt++;
      }
      if (menuMax > cnt || cnt <= 1) continue;

      if (menuMax < cnt) {
        tmpMenu = [menus];
      } else tmpMenu.push(menus);

      menuMax = cnt;
    }
    result.push(...tmpMenu);
  }
  return result.sort();
}

function isIncludes(parentString, sunString) {
  if (sunString.length > parentString.length) return false;

  for (let i = 0; i < sunString.length; i++) {
    if (!parentString.includes(sunString[i])) return false;
  }
  return true;
}
