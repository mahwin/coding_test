function solution(cards1, cards2, goal) {
  let pre1 = -1;
  let pre2 = -1;
  for (let i = 0; i < goal.length; i++) {
    const word = goal[i];
    let idx1 = cards1.indexOf(word);
    if (idx1 !== -1) {
      if (pre1 !== -1 && pre1 !== idx1 - 1) return "No";
      pre1 = idx1;
    } else {
      let idx2 = cards2.indexOf(word);
      if (pre2 !== -1 && pre2 !== idx2 - 1) return "No";
      pre2 = idx2;
    }
  }
  return "Yes";
}
