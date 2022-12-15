function solution(s) {
  let min = s.length;
  for (let pick = 1; pick <= s.length / 2; pick++) {
    let newS = 0;
    for (let i = 0; i < s.length; i += 1) {
      const patten = s.slice(i, i + pick);
      let nextI = i + pick;

      while (nextI < s.length) {
        if (patten === s.slice(nextI, nextI + pick)) {
          nextI += pick;
        } else break;
      }
      if (patten.length < pick) {
        newS += patten.length;
        i = s.length;
      } else {
        if (i + pick === nextI) {
          //겹치는게 X
          newS += patten.length;
        } else {
          newS += patten.length + ((nextI - i) / pick).toString().length;
        }
        i = nextI - 1;
      }
    }

    min = min > newS ? newS : min;
  }

  return min;
}

solution("abcdegtqwaxs");

// aaaaaaaaabbbbbbbbbbaaaaaaaaaabbbbbbbbbbasdf
