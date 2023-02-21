function solution(babbling) {
  let answer = 0;
  const map = new Map();
  const canSay = ["aya", "ye", "woo", "ma"];
  canSay.forEach((word) => {
    map.set(word[0], word);
  });

  for (let i = 0; i < babbling.length; i++) {
    let cur = babbling[i];
    let tmp = "";
    while (map.has(cur[0])) {
      let value = map.get(cur[0]);
      tmp += value;
      cur = cur.slice(value.length);
    }
    if (tmp === babbling[i]) answer++;
  }

  return answer;
}
