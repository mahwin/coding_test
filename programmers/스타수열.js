function solution(a) {
  let compressA = [];
  let stack = [a[0], 1];
  for (let i = 1; i < a.length; i++) {
    // 제일 앞이나 제일 뒤의 겹치는 경우는 하나로 축소
    // 중간에 3개 이상을 2개로 축소
    if (a[i] === stack[0]) {
      stack[1]++;
    } else {
      if (stack[1] <= 1) compressA.push(stack[0]);
      else compressA.push(stack[0], stack[0]);
      stack = [a[i], 1];
    }
    if (i === a.length - 1) {
      if (stack[1] <= 1) compressA.push(stack[0]);
      else compressA.push(stack[0], stack[0]);
    }
  }

  if (compressA[0] === compressA[1]) {
    compressA.shift();
  }

  if (compressA[compressA.length - 1] === compressA[compressA.length - 2]) {
    compressA.pop();
  }
  a = [...compressA];
  console.log(a);

  let len = a.length;
  let cntObj = {};
  let max_cnt = -Infinity;
  let max_el = a[0];
  a.forEach((el) => {
    cntObj[el] = cntObj[el] ? cntObj[el] + 1 : 1;
    if (max_cnt <= cntObj[el]) {
      max_cnt = cntObj[el];
      max_el = el;
    }
  });

  let i = 0;
  let visited = Array.from({ length: len }, () => false);
  let cnt = 0;

  while (i < len) {
    if (a[i] === max_el && !visited[i]) {
      if (i > 0 && !visited[i - 1] && a[i - 1] !== max_el) {
        visited[i] = true;
        visited[i - 1] = true;
        i += 1;
        cnt += 1;
      } else if (i < len - 1 && a[i + 1] !== max_el) {
        visited[i] = true;
        visited[i + 1] = true;
        i += 1;
        cnt += 1;
      } else i += 1;
    } else i += 1;
  }
  return cnt * 2;
}

console.log(solution([5, 0, 2, 0, 9, 2, 6, 2, 2, 7]));
