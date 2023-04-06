function solution(players, callings) {
  let playerObj = {};
  let scoreObj = {};
  players.forEach((player, i) => {
    playerObj[player] = i;
    scoreObj[i] = player;
  });
  callings.forEach((name) => {
    const curIdx = playerObj[name];
    const prePlayer = scoreObj[curIdx - 1];
    playerObj[name]--;
    playerObj[prePlayer]++;
    scoreObj[curIdx] = prePlayer;
    scoreObj[curIdx - 1] = name;
  });
  const result = Array.from({ length: players.length }, () => null);

  for (let [score, name] of Object.entries(scoreObj)) {
    result[score] = name;
  }

  return result;
}
