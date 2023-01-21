function solution(n, cores) {
  const len = cores.length;

  let rest = n - len;

  let left = 1;
  let right = (Math.max(...cores) * rest) / len; // 제일 오래 걸리는 코어로 모두 다 처리할 때 보다 짧은 시간이 소요됨.
  let cnt, mid;
  while (left < right) {
    mid = ((left + right) / 2) >> 0;
    cnt = 0;

    cores.forEach((core) => {
      cnt += (mid / core) >> 0;
    });

    if (cnt >= rest) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  for (const core of cores) {
    rest -= ((left - 1) / core) >> 0;
  }

  for (let i = 0; i < len; i++) {
    if (right % cores[i] === 0) {
      rest -= 1;
      if (rest === 0) {
        return i + 1;
      }
    }
  }
}

console.log(solution(6, [1, 2, 3]));
