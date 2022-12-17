function solution(user_id, banned_id) {
  const isBanned = (name, ban) => {
    if (name.length !== ban.length) return false;
    for (let i = 0; i < name.length; i++) {
      if (ban[i] === "*") continue;

      if (ban[i] !== name[i]) return false;
    }
    return true;
  };

  let arr = Array.from({ length: banned_id.length }, () => []);

  user_id.forEach((name) => {
    banned_id.forEach((ban, banIdx) => {
      if (isBanned(name, ban)) arr[banIdx].push(name);
    });
  });

  let banSet = new Set();
  // const visited = Array.from({ length: arr.length }, () => false);
  const dfs = (target, tmp) => {
    if (target === tmp.length) {
      banSet.add([...tmp].sort().join(""));
      return;
    }

    for (let next of arr[tmp.length]) {
      if (tmp.includes(next)) continue;
      tmp.push(next);
      dfs(target, tmp);
      tmp.pop();
    }
  };
  dfs(arr.length, []);

  return banSet.size;
}

solution(
  ["frodo", "fradi", "crodo", "abc123", "frodoc"],
  ["fr*d*", "*rodo", "******", "******"]
);
