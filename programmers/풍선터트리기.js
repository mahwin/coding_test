// 인접한 풍선 중에 번호가 큰 풍선이 터지는데
// 딱 한번만 번호가 작은 번호가 터짐 (0번 일수도)
// 지금 체크하려는 숫자가 제일 작으면 안 터짐
// 지금 체크하려는 숫자가
function solution(a) {
  const len = a.length;
  let result = 2; //양 끝은 항상 만족함.

  let left = [a[0]];
  for (let i = 1; i < len; i++) {
    left.push(Math.min(left.at(-1), a[i]));
  }

  let right = Array.from({ length: len }, () => 0);
  right[len - 1] = a.at(-1);
  for (let i = len - 2; i > -1; i--) {
    right[i] = Math.min(right[i + 1], a[i]);
  }

  for (let i = 1; i < len - 1; i++) {
    const lMin = left[i - 1];
    const rMin = right[i + 1];
    const cur = a[i];
    if (lMin < cur && rMin < cur) continue;
    else result++;
  }

  return result;
}
