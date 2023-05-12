let sx, sy, w, h;

const calDistance = (bx, by, dirs) => {
  let result = [];
  //dirs 0아래 1오른 2위 3왼
  for (const d of dirs) {
    switch (d) {
      case 0:
        result.push((bx - sx) ** 2 + (by + sy) ** 2);
        break;
      case 1:
        result.push((2 * w - sx - bx) ** 2 + (by - sy) ** 2);
        break;
      case 2:
        result.push((bx - sx) ** 2 + (2 * h - by - sy) ** 2);
        break;
      case 3:
        result.push((bx + sx) ** 2 + (by - sy) ** 2);
        break;
    }
  }
  console.log(result);
  return Math.min(...result);
};

const searchMin = (bx, by) => {
  //x,y가 각각 달라서 4방향으로 찾기
  if (sx !== bx && sy !== by) {
    return calDistance(bx, by, [0, 1, 2, 3]);
  }
  //x,y가 같은 값이 있기에 한 방향을 제외하고 찾기.
  //dirs 0아래 1오른 2위 3왼
  if (sx === bx) {
    if (sy > by) {
      //x축이 같고 시작 y가 크니 아래 빼고 3방향 계산
      return calDistance(bx, by, [1, 2, 3]);
    } else {
      //x축이 같고 시작 y가 작으니 위 빼고 3방향 계산
      return calDistance(bx, by, [0, 1, 3]);
    }
  } else {
    if (sx > bx) {
      //y가 같고 시작 x가 크니 왼쪽 빼고 3방향 계산
      return calDistance(bx, by, [0, 1, 2]);
    } else {
      //y가 같고 시작 x가 작으니 오른쪽 빼고 3방향 계산
      return calDistance(bx, by, [0, 2, 3]);
    }
  }
};

function solution(m, n, startX, startY, balls) {
  // m,n 당구대의 가로,세로
  // 시작 위치와 공의 위치의 x,y값이 각각 다르면 4가지 방향이 가능함 search4Min
  // x나 y값이 같다면 3가지 방향이 가능함. search3Min
  // x,y 값이 모두 같은 경우는 주어지지 않음.

  //변수 클로벌
  [sx, sy, h, w] = [startX, startY, n, m];

  let result = [];
  balls.forEach(([ballX, ballY]) => {
    result.push(searchMin(ballX, ballY));
  });
  return result;
}
