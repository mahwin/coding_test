let set = new Set();

const fillBanPossible = (banPossible, user_id, banned_id) => {
  const result = [];
  const idLen = user_id.length;

  for (let i = 0; i < user_id.length; i++) {
    const id = user_id[i];
    const idLen = id.length;
    for (let j = 0; j < banned_id.length; j++) {
      const ban = banned_id[j];
      const banLen = ban.length;
      if (idLen !== banLen) continue;
      let matchCnt = 0;
      for (let k = 0; k < idLen; k++) {
        if (ban[k] == "*" || ban[k] == id[k]) {
          matchCnt++;
        } else break;
      }
      if (matchCnt == idLen) banPossible[j].push(id);
    }
  }
};

const dfs = (arr, node, tmp, target) => {
  if (node === target) {
    set.add(tmp.sort().join("-"));
    return;
  }
  for (let i = 0; i < arr[node].length; i++) {
    if (tmp.includes(arr[node][i])) continue;
    dfs(arr, node + 1, [...tmp, arr[node][i]], target);
  }
};

function solution(user_id, banned_id) {
  const banPossible = Array.from({ length: banned_id.length }, () => []);
  fillBanPossible(banPossible, user_id, banned_id);
  dfs(banPossible, 0, [], banned_id.length);
  return set.size;
}
