const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim();

const solution = () => {
  let target = input.length;
  let v;
  let set;
  const dfs = (idx, cnt, route) => {
    if (cnt === target) {
      set.add(route);
      return;
    }

    for (let prev = idx - 1; prev >= 0; prev--) {
      if (v[prev]) continue;
      else {
        v[prev] = true;

        dfs(prev, cnt + 1, route + route + input[prev]);
        v[prev] = false;
        break;
      }
    }

    for (let next = idx + 1; next < target; next++) {
      if (v[next]) continue;
      else {
        v[next] = true;
        dfs(next, cnt + 1, route + route + input[next]);
        v[next] = false;
        break;
      }
    }
  };

  set = new Set();
  v = Array.from({ length: target }, () => false);

  for (let i = 0; i < input.length; i++) {
    v[i] = true;
    dfs(i, 1, input[i]);
    v[i] = false;
  }

  console.log(set.size);
};

solution();
