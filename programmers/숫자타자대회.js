const isValid = (x, y) => {
  if (y < 0 || y > 4 || x < 0 || x > 3) return false;
  else return true;
};

const bfs = (pos, target) => {
  let queue = [
    [...pos[0], 0, 1], //현 위치, 시행횟수, right of left
    [...pos[1], 0, 0],
  ];

  let dirs = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  let diagonals = [
    [1, -1],
    [1, 1],
    [-1, 1],
    [-1, -1],
  ];

  let cntBoard = Array.from({ length: 4 }, (_, i) =>
    Array.from({ length: 3 }, (_, j) => Infinity)
  );

  while (queue.length) {
    let [x, y, cnt, isLeft] = queue.shift();

    if (target[0] === x && target[1] === y) {
      if (cnt === 0) return [1, isLeft];
      else return [cnt, isLeft];
    }

    for (let dir of dirs) {
      let nx = x + dir[0];
      let ny = y + dir[1];
      if (isValid(nx, ny) && cntBoard[nx][ny] > cnt + 2) {
        cntBoard[nx][ny] = cnt + 2;
        queue.push([nx, ny, cnt + 2, isLeft]);
      }
    }
    for (let dia of diagonals) {
      let nx = x + dia[0];
      let ny = y + dia[1];
      if (isValid(nx, ny) && cntBoard[nx][ny] > cnt + 3) {
        cntBoard[nx][ny] = cnt + 3;
        queue.push([nx, ny, cnt + 3, isLeft]);
      }
    }
  }
};

const phoneNumToPos = () => {
  let phone = {};
  for (let i = 1; i < 10; i++) {
    let x = Math.floor((i - 1) / 3);
    let y = (i - 1) % 3;
    phone[i] = [x, y];
  }
  phone["0"] = [3, 1];
  return phone;
};

function solution(numbers) {
  let phoone = phoneNumToPos();

  let pos = [
    [1, 0],
    [1, 2],
  ];
  let total = 0;

  for (let i = 0; i < numbers.length; i++) {
    let num = numbers[i];
    const target = phoone[num];

    [cnt, isLeft] = bfs(pos, target);
    total += cnt;
    isLeft ? (pos[0] = target) : (pos[1] = target);
  }

  return total;
}

console.log(solution("5123"));
