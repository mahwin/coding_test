const timeToMin = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

function solution(plans) {
  const stack = [];
  const result = [];
  plans = plans.map(([sub, time, play]) => [
    sub,
    timeToMin(time),
    Number(play),
  ]);

  plans.sort((a, b) => a[1] - b[1]);
  let time = plans[0][1];
  let planP = 0;

  while (planP < plans.length) {
    if (stack.length) {
      if (stack[stack.length - 1][2] === 1) {
        result.push(stack.pop()[0]);
      } else stack[stack.length - 1][2]--;
    }
    if (planP < plans.length && plans[planP][1] <= time) {
      stack.push(plans[planP]);
      planP++;
    }
    time++;
  }
  stack.reverse().forEach(([name, s, p]) => result.push(name));

  return result;
}

solution(
  [
    ["music", "12:20", "40"],
    ["computer", "12:30", "100"],
    ["science", "12:40", "50"],
    ["history", "14:00", "30"],
  ],
  ["science", "history", "computer", "music"]
);
