let input = `2
5
a b
b c
a d
a e
e a
`.split("\n");

const result = [];

const solution = () => {
  const testCases = +input[0];
  let idx = 1;
  for (let i = 0; i < testCases; i++) {
    const n = +input[idx];
    cal(input.slice(idx + 1, idx + n + 1));
    idx += n + 1;
  }
  console.log(result.join("\n"));
};

const cal = (input) => {
  const friendObj = new Map();

  input = input.map((el) => {
    const [name1, name2] = el.split(" ");
    if (!friendObj.has(name1)) {
      friendObj.set(name1, friendObj.size);
    }
    if (!friendObj.has(name2)) {
      friendObj.set(name2, friendObj.size);
    }
    return [friendObj.get(name1), friendObj.get(name2)];
  });

  const p = Array.from({ length: friendObj.size + 1 }, (_, i) => [i, 1]);

  input.forEach(([a, b]) => {
    union(a, b, p);
    result.push(getP(a, p)[1]);
  });
};

const getP = (x, p) => {
  if (p[x][0] === x) return p[x];
  p[x] = getP(p[x][0], p);
  return p[x];
};

const union = (a, b, p) => {
  const ap = getP(a, p);
  const bp = getP(b, p);

  if (ap[0] === bp[0]) return;

  if (ap[0] > bp[0]) {
    p[a][0] = bp[0];
    p[b][1] += ap[1];
  } else {
    p[b][0] = ap[0];
    p[a][1] += bp[1];
  }
};
solution();
