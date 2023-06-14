function solution(players, callings) {
  const pGMap = new Map(); // 선수 이름 key : 등수 value
  const gPMap = new Map(); // 등수 key : 선수 이름 value
  players.forEach((player, i) => {
    pGMap.set(player, i + 1);
    gPMap.set(i + 1, player);
  });

  callings.forEach((player) => {
    const g = pGMap.get(player);
    const preP = gPMap.get(g - 1);

    pGMap.set(player, g - 1);
    pGMap.set(preP, g);
    gPMap.set(g - 1, player);
    gPMap.set(g, preP);
  });

  return [...gPMap.entries()].sort((a, b) => a[1] - b[1]).map((el) => el[1]);
}
