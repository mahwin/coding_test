function solution(n, m, x, y, r, c, k) {
  //n,m 격자 크기 x,y 현 위치 r,c 타켓 k 이동횟수
  // d l r u

  const calDis = (distance) => {
    return Math.abs(distance[0]) + Math.abs(distance[1]);
  };

  const isValid = (x, y) => {
    if (x > 0 && x <= n && y > 0 && y <= m) return true;
    else return false;
  };

  let answer = "";
  let cnt = Math.abs(r - x) + Math.abs(c - y);
  if (cnt % 2 !== k % 2 || cnt > k) return "impossible";
  console.log(r, c);
  console.log(x, y);
  while (k) {
    let remain = k - calDis([r - x, c - y]);
    console.log(remain, k);
    if (remain > 1) {
      if (isValid(x + 1, y)) {
        answer += "d";
        x++;
      } else if (isValid(x, y - 1)) {
        answer += "l";
        y--;
      } else if (isValid(x, y + 1)) {
        answer += "r";
        y++;
      } else {
        answer += "u";
        x--;
      }
    }
    if (remain === 0) {
      let [needX, needY] = [x - r, y - c];
      if (needX < 0) answer += "d".repeat(-needX);
      if (needY > 0) answer += "l".repeat(needY);
      if (needY < 0) answer += "r".repeat(-needY);
      if (needX > 0) answer += "u".repeat(needX);

      break;
    }
    k--;
  }
  return answer;
}

console.log(solution(3, 4, 2, 3, 3, 1, 5));
