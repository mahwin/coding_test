function solution(priorities, location) {
  let result = 0;

  priorities = priorities.map((el, i) => [el, i === location]);

  for (let p = 9; p >= 1; p--) {
    for (let i = 0; i < priorities.length; i++) {
      if (priorities[i][0] === p) {
        if (priorities[i][1]) return result + 1;
        priorities = priorities.slice(i + 1).concat(priorities.slice(0, i));
        result++;
        i = -1;
      }
    }
  }
}
