function solution(picks, minerals) {
  const totalMineral = minerals.length;

  let min = Infinity;
  const dfs = (mineralP, tools, piro) => {
    if (totalMineral <= mineralP) {
      min = Math.min(min, piro);
      return;
    } else if (tools.join(",") === "0,0,0") {
      min = Math.min(min, piro);
      return;
    }

    const [d, i, s] = tools;

    const possibleMineral = [];

    for (let i = mineralP; i < mineralP + 5; i++) {
      if (i >= totalMineral) break;
      possibleMineral.push(minerals[i]);
    }
    let nextMineralP = mineralP + possibleMineral.length;

    if (d > 0) {
      dfs(nextMineralP, [d - 1, i, s], piro + possibleMineral.length);
    }
    if (i > 0) {
      let addPiro = 0;
      possibleMineral.forEach((el) => {
        addPiro += cal("iron", el);
      });
      dfs(nextMineralP, [d, i - 1, s], piro + addPiro);
    }
    if (s > 0) {
      let addPiro = 0;
      possibleMineral.forEach((el) => {
        addPiro += cal("stone", el);
      });
      dfs(nextMineralP, [d, i, s - 1], piro + addPiro);
    }
  };
  dfs(0, picks, 0);
  return min;
}

function cal(tool, mineral) {
  if (tool === "iron" && mineral === "diamond") return 5;
  if (tool === "stone") {
    if (mineral === "diamond") return 25;
    else if (mineral === "iron") return 5;
  }
  return 1;
}
