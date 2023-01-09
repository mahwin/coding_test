function solution(queries) {
  let patten = ["RR", "Rr", "Rr", "rr"];
  let answer = [];

  for (let [gen, index] of queries) {
    let tmp = [];
    while (gen > 1) {
      if (gen === 2) {
        tmp = [patten[index - 1]];
        break;
      }
      const pre = 4 ** (gen - 2);
      if (pre >= index) {
        tmp = ["RR"];
        break;
      } else if (pre * 3 <= index) {
        tmp = ["rr"];
        break;
      }
      index = ((index - 1) % pre) + 1;
      gen--;
    }

    if (tmp.length) answer.push(tmp[0]);
    else answer.push("Rr");
  }

  return answer;
}
