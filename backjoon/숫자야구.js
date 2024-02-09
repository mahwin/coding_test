let input = `4
123 1 1
356 1 0
327 2 0
489 0 1`.split("\n");

const solution = () => {
  const N = Number(input.shift());
  const checkArr = input.map((el) => el.split(" "));

  let result = 0;
  const dfs = (acc) => {
    if (acc.length === 3) {
      if (check(acc.join(""), checkArr)) result++;
      return;
    }
    for (let i = 1; i < 10; i++) {
      if (acc.includes(i)) continue;
      dfs(acc.concat(i));
    }
  };

  const check = (check, checkArr) => {
    for (const [speak, strike1, ball1] of checkArr) {
      let strike = 0;
      let ball = 0;
      for (let i = 0; i < 3; i++) {
        if (speak[i] === check[i]) {
          strike++;
          continue;
        }
        if (check.includes(speak[i])) ball++;
      }
      if (strike != strike1 || ball != ball1) return false;
    }

    return true;
  };

  dfs([]);

  console.log(result);
};

solution();
