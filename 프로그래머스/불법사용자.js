function solution(user_id, banned_id) {
  let resultIdSet = new Set();

  const banMatchId = {};

  for (const mask of banned_id) {
    banMatchId[mask] = [];
    for (const id of user_id) {
      if (isMatch(id, mask)) {
        banMatchId[mask].push(id);
      }
    }
  }

  const dfs = (nextIdx, idSet) => {
    if (nextIdx === banned_id.length) {
      resultIdSet.add([...idSet].sort().join("-"));
      return;
    }
    const mask = banned_id[nextIdx];
    for (const matchedId of banMatchId[mask]) {
      if (idSet.has(matchedId)) continue;
      const cpSet = new Set([...idSet]);
      dfs(nextIdx + 1, cpSet.add(matchedId));
    }
  };
  dfs(0, new Set());

  return resultIdSet.size;
}

function isMatch(id, mask) {
  if (id.length !== mask.length) return false;

  for (let i = 0; i < id.length; i++) {
    if (mask[i] === "*") continue;
    if (mask[i] !== id[i]) return false;
  }
  return true;
}
