function solution(program) {
  program = program.map((el, i) => [...el, i]);

  let answer = Array.from({ length: 11 }, () => 0);

  let excute = [];
  let time = 0;
  let waitArr = [];

  while (waitArr.length !== 0 || program.length !== 0) {
    for (let i = 0; i < program.length; i++) {
      if (program[i][1] <= time) {
        waitArr.push(program[i]);
      }
    }
    let deleteIdx = waitArr.map((el) => el[3]);

    program = program.filter((el) => !deleteIdx.includes(el[3]));

    if (excute.length === 0 && waitArr.length !== 0) {
      let tmp = [];
      waitArr.forEach((el) => {
        el[1] <= time ? tmp.push(el) : null;
      });

      tmp.sort((a, b) => {
        if (a[0] !== b[0]) return b[0] - a[0];
        else return b[1] - a[1];
      });
      const nextExcute = tmp.pop();

      excute = [nextExcute];
      waitArr = waitArr.filter((el) => el[3] !== nextExcute[3]);
    }
    if (excute.length !== 0) {
      [prioty, start, duration, idx] = excute.pop();

      answer[prioty] += time === start ? 0 : time - start;
      time += duration;
    } else {
      time++;
    }
  }
  answer[0] = time;
  return answer;
}

console.log(
  solution([
    [2, 0, 10],
    [1, 5, 5],
    [3, 5, 3],
    [3, 12, 2],
  ])
);
