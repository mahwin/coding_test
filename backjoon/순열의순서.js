const fac = (n) => {
  let result = 1;
  for (let i = n; i >= 1; i--) {
    result *= i;
  }
  return result;
};

const solution = (input) => {
  const n = Number(input[0]);
  input = input[1].split(" ").map(Number);

  const findUnUsed = (used, step) => {
    let cnt = 0;
    for (let i = 1; i <= used.length; i++) {
      if (!used[i]) {
        if (step === cnt) return i;
        else cnt++;
      }
    }
  };

  const getStep = (used, target) => {
    let cnt = 0;
    for (let i = 1; i <= used.length; i++) {
      if (!used[i]) {
        if (i === target) return cnt;
        cnt++;
      }
    }
  };

  const sol = (n, target) => {
    let result = [];
    const used = Array.from({ length: n + 1 }, () => false);
    for (let i = n; i > 0; i--) {
      const f = BigInt(fac(i - 1));
      const step = (target - 1n) / f;
      const nextN = findUnUsed(used, Number(step));
      target -= f * step;
      result.push(nextN);
      used[nextN] = true;
    }
    return result.join(" ");
    // console.log(result.join(" "));
  };

  const sol2 = (n, target) => {
    let result = 1n;
    const used = Array.from({ length: n + 1 }, () => false);
    for (let i = 0; i < n; i++) {
      let step = BigInt(getStep(used, target[i]));
      result += step * BigInt(fac(n - 1 - i));
      used[target[i]] = true;
    }
    return Number(result);
    // console.log(Number(result) + "");
  };

  if (input[0] === 1) {
    return sol(n, BigInt(input[1]));
  } else {
    return sol2(n, input.slice(1));
  }
};

while (true) {
  const n = 20;
  const max = fac(n);

  const random = Math.ceil(max * Math.random());

  let result = solution(
    `${n}
1 ${random}`.split("\n")
  );

  let result2 = solution(
    `${n}
2 ${result}`.split("\n")
  );
  if (random !== result2) {
    console.log(result);
    console.log(result2);
    break;
  }
}
