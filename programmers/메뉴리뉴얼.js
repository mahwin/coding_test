function solution(orders, course) {
  const combis = Array.from({ length: 21 }, () =>
    Array.from({ length: 11 }, () => [])
  );

  let tmp = [];

  const dfs = (len, pick, node) => {
    if (pick === tmp.length) {
      combis[len][pick].push([...tmp]);
      return;
    }
    for (let i = node; i < len; i++) {
      tmp.push(i);
      dfs(len, pick, i + 1);
      tmp.pop();
    }
  };
  const menuObj = {};
  course.forEach((c) => (menuObj[c] = {}));

  for (let i = 0; i < orders.length; i++) {
    const menu = orders[i].split("").sort().join("");
    for (let j = 0; j < course.length; j++) {
      const pick = course[j];

      if (!combis[menu.length][pick].length) {
        tmp = [];
        dfs(menu.length, pick, 0);
      }

      const combinations = combis[menu.length][pick];

      for (const combination of combinations) {
        let menuKey = "";
        for (const c of combination) {
          menuKey += menu[c];
        }
        menuObj[pick][menuKey] = menuObj[pick][menuKey]
          ? menuObj[pick][menuKey] + 1
          : 1;
      }
    }
  }
  let result = [];
  course.forEach((c) => {
    const cnt = Math.max(...Object.values(menuObj[c]));
    if (cnt >= 2) {
      Object.keys(menuObj[c]).forEach((menu) => {
        if (menuObj[c][menu] === cnt) result.push(menu);
      });
    }
  });

  return result.sort();
}
