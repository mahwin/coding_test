const isBanned = (userId, banId) => {
  if (userId.length !== banId.length) return false;
  for (let i = 0; i < userId.length; i++) {
    if (banId[i] !== "*" && banId[i] !== userId[i]) return false;
  }
  return true;
};

const solution = (user_id, banned_id) => {
  const visited = Array(user_id.length).fill(false);
  const bannedIdSet = new Set();

  const dfs = (idx, cnt, banString) => {
    if (cnt === banned_id.length) {
      let arr = banString.split(" ");

      arr.shift();
      arr.sort();
      let str = arr.join("");
      bannedIdSet.add(str);
    }

    for (let i = idx; i < banned_id.length; i++) {
      for (let j = 0; j < user_id.length; j++) {
        if (visited[j]) continue;
        if (!isBanned(user_id[j], banned_id[i])) continue;

        //방문한 적도 없으면서 사용 불가능한 아이디임

        visited[j] = true;
        dfs(i + 1, cnt + 1, banString + " " + user_id[j]);
        visited[j] = false;
      }
    }
  };
  dfs(0, 0, "");
  return bannedIdSet.size;
};

console.log(
  solution(
    ["frodo", "fradi", "crodo", "abc123", "frodoc"],
    ["*rodo", "*rodo", "******"]
  )
);
