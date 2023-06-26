function solution(info, edges) {
  const binaryTree = {};
  edges.forEach(([from, to]) => {
    binaryTree[from] = binaryTree[from] ? binaryTree[from].concat(to) : [to];
  });

  const leafNodes = [];
  let sheep = 0;
  const dfs = (node, sh, wo, possible) => {
    sheep = Math.max(sh, sheep);

    if (binaryTree[node]) {
      possible.push(...binaryTree[node]);
    }

    for (let i = 0; i < possible.length; i++) {
      const nextNode = possible[i];
      const animal = info[nextNode];

      if (animal === 0) {
        const newPossible = [...possible];
        newPossible.splice(i, 1);
        dfs(nextNode, sh + 1, wo, newPossible);
      } else if (sh > wo + 1) {
        const newPossible = [...possible];
        newPossible.splice(i, 1);
        dfs(nextNode, sh, wo + 1, newPossible);
      }
    }
  };
  dfs(0, 1, 0, []);
  return sheep;
}
