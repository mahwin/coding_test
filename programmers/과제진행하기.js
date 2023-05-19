const timeToMin = (time) => {
  const [H, M] = time.split(":").map(Number);
  return H * 60 + M;
};

// 현 시간을 +1 씩하며 어떤 과제를 수행할지 반복문 수행;
function solution(plans) {
  plans = plans.map(([subject, start, duration]) => {
    return [subject, timeToMin(start), Number(duration)];
  });

  plans.sort((a, b) => a[1] - b[1]); // 시작시간을 기준으로 오름차순 정렬
  const start = plans[0][1]; // 제일 빠른 시작 시간부터;
  const last = plans[plans.length - 1][1]; // 제일 늦은 시작 시각.
  const stack = []; // 완수 못한 과제 [과목,남은 시간]
  const result = [];
  let planIdx = 0;
  for (let time = start; time <= last; time++) {
    if (time >= plans[planIdx][1]) {
      //현 시간이 다음 과제의 시작보다 빠르면
      const [sub, s, d] = plans[planIdx];
      stack.push([sub, d]); // d-1 현재 과제 수행
      planIdx++;
    }
    if (stack.length > 0) {
      const [sub, d] = stack[stack.length - 1];
      if (d === 1) {
        result.push(sub);
        stack.pop();
      } else stack[stack.length - 1][1]--; // -- 스택에 있는 과제 수행
    }
  }

  while (stack.length) {
    result.push(stack.pop()[0]);
  }
  return result;
}
// plans을 기준으로 반복문 실행
// i 번째 과제의 실행 시각과 i+1번 과제의 실행 시간의 사이에 나머지 과제를 수행하는 식.
function solution1(plans) {
  plans = plans.map(([subject, start, duration]) => {
    return [subject, timeToMin(start), Number(duration)];
  });

  plans.sort((a, b) => a[1] - b[1]); // 시작시간을 기준으로 오름차순 정렬
  const stack = []; // 완수 못한 과제 [과목,남은 시간]

  let curTime = 0;

  plans.forEach((plan) => {
    const pre = stack.at(-1);
    // stack이 있을 경우
    while (pre) {
      if (plan[1] - curTime < pre[2]) {
        pre[2] = pre[2] - (plan[1] - curTime);
        break;
      } else {
        let temp = stack.pop();
        curTime += temp[2];
        answer.push(temp[0]);
        pre = stack.at(-1);
      }
    }
    curTime = plan[1];
    stack.push(plan);
  });

  while (stack.length) {
    answer.push(stack.pop());
  }

  return answer;
}

console.log(
  solution([
    ["science", "12:40", "50"],
    ["music", "12:20", "40"],
    ["history", "14:00", "30"],
    ["computer", "12:30", "100"],
  ])
);
