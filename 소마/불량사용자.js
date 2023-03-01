function solution(user_id, banned_id) {
  const bans = [];
  for (const ban of banned_id) {
    const tmp = [];
    for (const user of user_id) {
      if (ban.length !== user.length) continue;
      let flag = true;
      for (let i = 0; i < user.length; i++) {
        if (ban[i] === "*") continue;
        if (ban[i] !== user[i]) flag = false;
      }
      if (flag) {
        tmp.push(user);
      }
    }
    bans.push(tmp);
  }
  const N = bans.length;

  const set = new Set();
  const dfs = (cnt, tmp) => {
    if (cnt === N) {
      let tmpSet = new Set(tmp);
      if (tmpSet.size !== N) return;
      set.add([...tmp].sort().join(","));
      return;
    }

    for (const next of bans[cnt]) {
      dfs(cnt + 1, [...tmp, next]);
    }
  };
  dfs(0, []);

  return set.size;
}

console.log(
  solution(
    ["frodo", "fradi", "crodo", "abc123", "frodoc"],
    ["fr*d*", "*rodo", "******", "******"]
  )
);
