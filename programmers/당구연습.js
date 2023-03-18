function calDistance(x1, y1, x2, y2, n, m, dirs) {
  //dirs = 0 : 동  1 : 서  2 : 남  3 : 북
  let cal = Infinity;
  let tmp;
  let tmpPos;
  for (const d of dirs) {
    switch (d) {
      case 0:
        tmpPos = 2 * m - x1;
        tmp = (tmpPos - x2) ** 2 + (y1 - y2) ** 2;
        break;
      case 1:
        tmpPos = -x1;
        tmp = (tmpPos - x2) ** 2 + (y1 - y2) ** 2;
        break;
      case 2:
        tmpPos = -y1;
        tmp = (x1 - x2) ** 2 + (tmpPos - y2) ** 2;
        break;
      case 3:
        tmpPos = 2 * n - y1;
        tmp = (x1 - x2) ** 2 + (tmpPos - y2) ** 2;
        break;
    }
    cal = Math.min(cal, tmp);
  }
  return cal;
}

function solution(m, n, startX, startY, balls) {
  let result = [];
  [x1, y1] = [startX, startY];
  balls.forEach(([x2, y2]) => {
    const x = (x1 + x2) / 2;
    const y = (y1 + y2) / 2;
    if (x1 !== x2 && y1 !== y2) {
      //4가지 점이 다 다를때
      let dirs = [0, 1, 2, 3];
      result.push(calDistance(x1, y1, x2, y2, n, m, dirs));
    } else if (x1 !== x2) {
      //y 일치
      let dirs = x1 > x2 ? [0, 2, 3] : [1, 2, 3];
      result.push(calDistance(x1, y1, x2, y2, n, m, dirs));
    } else if (y1 !== y2) {
      //x 일치
      let dirs = y1 > y2 ? [0, 1, 3] : [0, 1, 2];
      result.push(calDistance(x1, y1, x2, y2, n, m, dirs));
    } else result.push(0);
  });
  return result;
}
console.log(solution(10, 10, 1, 5, [[2, 5]]));
