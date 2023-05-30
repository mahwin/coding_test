let input = `2
3
7`.split("\n");

const solution = () => {
  const [n, ...arr] = input.map(Number);
  const max = Math.max(...arr);
  const result = {};
  for (let key of arr) {
    result[key] = new Set();
  }

  const opers = [];

  const check = () => {
    let concatString = "1";
    for (let i = 2; i <= opers.length; i++) {
      concatString += opers[i - 1] + i;
    }
    return eval(concatString.split(" ").join("")) === 0 ? concatString : null;
  };

  const dfs = () => {
    if (arr.includes(opers.length)) {
      const key = opers.length;
      const concatString = check();
      if (concatString) {
        result[key] = result[key]
          ? result[key].add(concatString)
          : new Set(concatString);
      }
    }
    if (opers.length >= max) return;

    for (let oper of [" ", "+", "-"]) {
      opers.push(oper);
      dfs();
      opers.pop();
    }
  };
  dfs();
  let print = "";
  for (let key of arr) {
    for (const o of result[key]) {
      print += o + "\n";
    }
    print += "\n";
  }
  console.log(print.trim());
};

solution();
