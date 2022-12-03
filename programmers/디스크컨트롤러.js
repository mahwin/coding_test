function solution(jobs) {
  let answer = 0;
  let workFinish = 0;
  let priotyQueue = [];
  let currentJobIdx = 0;
  //하나의 디스크가 실행될 때 그 시간 내에서 들어오는 요청의 경우는 최대한 빨리 시행해줘야함
  //그렇지 않으면 작업 시간이 계속 1ms씩 늘어나기 때문
  //같은 이유로 하나의 디스크가 실행되고 있는 와중에 들어온 요청들의 경우는 작업 수행 시간이 짧은 작업부터 해줘여함.
  jobs.sort((a, b) => a[0] - b[0]);
  let jobsLength = jobs.length;
  //큐에 수행할 작업이 남아 있거나, 모든 작업을 수행하지 않았으면
  while (priotyQueue.length > 0 || jobsLength > currentJobIdx) {
    //  모든 작업이 수행되지 않았고, 지금 실행하는 작업이 끝나기 전에 들어온 요청의 작업이 있으면
    if (jobsLength > currentJobIdx && workFinish >= jobs[currentJobIdx][0]) {
      priotyQueue.push(jobs[currentJobIdx]);
      currentJobIdx++;

      //작업 시간이 짧은 일부터 먼저
      priotyQueue.sort((work1, work2) => work1[1] - work2[1]);
      continue;
    }
    if (priotyQueue.length !== 0) {
      const [start, end] = priotyQueue.shift();
      workFinish += end;
      answer += workFinish - start;
    } else {
      workFinish = jobs[currentJobIdx][0];
    }
  }
  return Math.floor(answer / jobsLength);
}

console.log(
  solution([
    [0, 3],
    [1, 9],
    [2, 6],
  ])
);
