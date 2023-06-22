const timeToMin = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

function solution(plans) {
  // 분으로 통일
  plans = plans.map((el) => [el[0], timeToMin(el[1]), Number(el[2])]);
  // 시작 시간이 빠른 순으로 정렬
  plans.sort((a, b) => a[1] - b[1]);
  let result = [];
  let stack = [];
  for (let i = 0; i < plans.length - 1; i++) {
    let nextStartTime = plans[i + 1][1];
    let curFinTime = plans[i][1] + plans[i][2];
    if (curFinTime <= nextStartTime) {
      let remainTime = nextStartTime - curFinTime;
      // 현재 과제를 마무리하는 시간보다 다음 과제 시작 시간이 훨씬 길다면 현재 과제를 다 할 수 있다.
      result.push(plans[i][0]);
      // 현재 과제는 다 했을테고, 밀려있던 과제도 어느정도 했을 것이다.
      while (stack.length && remainTime != 0) {
        const [subject, duration] = stack.pop();
        if (remainTime >= duration) {
          result.push(subject);
          remainTime -= duration;
        } else if (remainTime < duration) {
          stack.push([subject, duration - remainTime]);
          remainTime = 0;
        }
      }
    } else {
      // 전 과제를 끝내기 전에 과제가 들어왔다면
      stack.push([plans[i][0], curFinTime - nextStartTime]);
    }
  }

  result.push(plans.at(-1)[0]);
  for (let i = stack.length - 1; i >= 0; i--) {
    result.push(stack[i][0]);
  }
  return result;
}
