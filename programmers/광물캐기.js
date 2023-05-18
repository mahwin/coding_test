function solution(picks, minerals) {
  let answer = Infinity;

  const needTools = Math.ceil(minerals.length / 5); // 1. 미네랄을 다 캐기 위해 필요한 곡갱이
  const total = Math.min(
    needTools,
    picks.reduce((p, c) => (p += c), 0)
  ); // 1과 가진 곡갱이의 수 max 구하기 => 선택해야할 곡갱이의 수.

  const tools = []; // 0 다이아, 1 철, 2 돌

  const calPiro = () => {
    let result = 0;
    let mineralIdx = 0;
    for (let i = 0; i < total; i++) {
      const tool = tools[i];
      for (let j = 0; j < 5; j++) {
        const mineral = minerals[mineralIdx];
        if (mineral === "stone" || tool === 0) result++;
        else if (mineral === "iron" && tool === 1) result++;
        else if (mineral === "diamond" && tool === 2) result += 25;
        else result += 5;
        mineralIdx++;
        // 미네랄이 먼저 소진시 결과값 return;
        if (mineralIdx == minerals.length) return result;
      }
    }
    return result;
  };

  const dfs = () => {
    if (tools.length === total) {
      //필요한 만큼의 도구를 골랐다면
      ㄴ;
      answer = Math.min(answer, calPiro());
      return;
    }
    for (let i = 0; i < 3; i++) {
      if (picks[i] > 0) {
        picks[i]--;
        tools.push(i);
        dfs();
        tools.pop();
        picks[i]++;
      }
    }
  };

  dfs();

  return answer;
}

console.log(
  solution(
    [0, 1, 1],
    [
      "diamond",
      "diamond",
      "diamond",
      "diamond",
      "diamond",
      "iron",
      "iron",
      "iron",
      "iron",
      "iron",
      "diamond",
    ]
  )
);
