let input = `50 15
antarctica
antahellotica
antacafsdrtica
antarngjocbtica
antarnfzojctica
antarnaffuctica
antarnaapoctica
antarnapgoctica
antardsfjoctica
antanapgoctica
antaafsdrctica
antarjhgctica
antarfjhctica
antarfbncttica
antarrtctica
antarbetrectica
antarqreufctica
antarrectica
antarqfjectica
antarafjtica
antarqvawectica
antarqofwyctica
antarvnfjctica
antarqovaeutica
antareufjectica
antarqefjtica
antarqefjectica
antaructica
antarqafdoctica
antarqictica
antarqerjictica
antarqoeictica
antarqeeictica
antarbroctica
antarbuyuoctica
antarbvuroctica
antarbiuyyctica
antarbdsfhctica
antarbquroctica
antarinfjctica
antarirjectica
antariqwctica
antariwyectica
antarigsdvctica
antarijectica
antarqegafdtica
antarqctica
antarqgoeictica
antarqtqtoetica
antarqnuyectica`.split("\n");

const filter = (input) => {
  return input.map((el) => {
    const set = new Set();
    el.split("").forEach((char) => {
      set.add(convertIdx(char));
    });
    return [...set];
  });
};

const convertIdx = (char) => {
  return char.charCodeAt() - "a".charCodeAt();
};

const solution = () => {
  const [N, K] = input.shift().split(" ").map(Number);
  const visited = Array.from({ length: 26 }, () => false);
  input = filter(input);
  const prefix = "antic";

  prefix.split("").forEach((char) => {
    visited[convertIdx(char)] = true;
  });

  const needPick = K - prefix.length;

  let result = 0;
  if (needPick < 0) return 0;

  const dfs = (node, pick) => {
    if (pick === needPick) {
      result = Math.max(result, cnt(input, visited));
      return;
    }

    for (let i = node; i < 26; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      dfs(i + 1, pick + 1);
      visited[i] = false;
    }
  };

  dfs(0, 0);
  return result;
};

const cnt = (input, visited) => {
  let result = 0;

  for (let i = 0; i < input.length; i++) {
    let flag = true;
    for (let idx of input[i]) {
      if (!visited[idx]) flag = false;
    }
    if (flag) result++;
  }
  return result;
};

console.log(solution());
