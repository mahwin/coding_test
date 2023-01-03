function solution(user_id, banned_id) {
  const isBanned = (id, banId) => {
    if (id.length !== banId.length) return false;
    for (let i = 0; i < id.length; i++) {
      if (banId[i] === "*") continue;
      if (banId[i] !== id[i]) return false;
    }
    return true;
  };

  let banArr = Array.from({ length: banned_id.length }, () => []);

  user_id.forEach((id) => {
    banned_id.forEach((banId, bandIdx) => {
      if (isBanned(id, banId)) {
        banArr[bandIdx].push(id);
      }
    });
  });

  let result = new Set();
  let banLength = banArr.length;
  let visited = Array.from({ lengt: user_id.length }).fill(false);

  const dfs = (index, arr) => {
    if (arr.length === banLength) {
      arr.sort((a, b) => {
        return a.length === b.length ? (a > b ? -1 : 1) : a.length - b.length;
      });
      result.add(arr.join(""));
      return;
    }

    for (let i = index; i < banLength; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      banArr[i].forEach((id) => {
        if (!arr.includes(id)) {
          dfs(i + 1, [...arr, id]);
        }
      });
      visited[i] = false;
    }
  };

  dfs(0, []);

  return result.size;
}

console.log(
  solution(
    [
      "aaaaaaaa",
      "bbbbbbbb",
      "cccccccc",
      "dddddddd",
      "eeeeeeee",
      "ffffffff",
      "gggggggg",
      "hhhhhhhh",
    ],
    [
      "********",
      "********",
      "********",
      "********",
      "********",
      "********",
      "********",
      "********",
    ]
  )
);
