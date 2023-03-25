const input = [];
const readline = require("readline");
readline
  .createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  .on("line", (line) => {
    input.push(line);
  })
  .on("close", () => {
    const [n, m] = input[0].split(" ").map(Number);

    const p = Array.from({ length: n + 1 }, (_, i) => i);

    const getP = (x) => {
      if (p[x] === x) return x;
      else p[x] = getP(p[x]);
      return p[x];
    };

    const union = (a, b) => {
      const ap = getP(a);
      const bp = getP(b);
      if (ap > bp) p[ap] = bp;
      else p[bp] = ap;
    };

    const isSameParent = (a, b) => {
      const ap = getP(a);
      const bp = getP(b);
      if (ap === bp) return "YES";
      else return "NO";
    };

    let result = "";
    for (let i = 1; i <= m; i++) {
      const [oper, a, b] = input[i].split(" ").map(Number);
      if (oper === 1) result += isSameParent(a, b) + "\n";
      else union(a, b);
    }

    console.log(result.trim());

    process.exit();
  });
