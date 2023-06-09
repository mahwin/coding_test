// n 0 비트열 '1'                              4**0
// n 1 비트열 '11011'                          4**1
// n 2 비트열 '1101111011000001101111011'      4**2
//                                           4**3

function solution(n, l, r) {
  const dfs = (num) => {
    if (num <= 5) {
      if (num >= 3) return num - 1;
      else return num;
    }
    let gen = 1;
    while (5 ** (gen + 1) < num) {
      gen++;
    }

    const q = Math.floor(num / 5 ** gen);
    const remain = num % 5 ** gen;

    let result = 0;

    if (q >= 3) result += (q - 1) * 4 ** gen;
    else result += q * 4 ** gen;

    if (q === 2) {
      return result;
    } else {
      return result + dfs(remain);
    }
  };
  return dfs(r) - dfs(l - 1);
}
