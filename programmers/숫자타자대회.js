// const isValid = (x, y) => {
//   if (y < 0 || y > 4 || x < 0 || x > 3) return false;
//   else return true;
// };

// const bfs = (pos, target) => {
//   let queue = [
//     [...pos[0], 0, 1], //현 위치, 시행횟수, right of left
//     [...pos[1], 0, 0],
//   ];

//   let dirs = [
//     [1, 0],
//     [0, 1],
//     [-1, 0],
//     [0, -1],
//   ];
//   let diagonals = [
//     [1, -1],
//     [1, 1],
//     [-1, 1],
//     [-1, -1],
//   ];

//   let cntBoard = Array.from({ length: 4 }, (_, i) =>
//     Array.from({ length: 3 }, (_, j) => Infinity)
//   );

//   while (queue.length) {
//     let [x, y, cnt, isLeft] = queue.shift();

//     if (target[0] === x && target[1] === y) {
//       if (cnt === 0) return [1, isLeft];
//       else return [cnt, isLeft];
//     }

//     for (let dir of dirs) {
//       let nx = x + dir[0];
//       let ny = y + dir[1];
//       if (isValid(nx, ny) && cntBoard[nx][ny] > cnt + 2) {
//         cntBoard[nx][ny] = cnt + 2;
//         queue.push([nx, ny, cnt + 2, isLeft]);
//       }
//     }
//     for (let dia of diagonals) {
//       let nx = x + dia[0];
//       let ny = y + dia[1];
//       if (isValid(nx, ny) && cntBoard[nx][ny] > cnt + 3) {
//         cntBoard[nx][ny] = cnt + 3;
//         queue.push([nx, ny, cnt + 3, isLeft]);
//       }
//     }
//   }
// };

// const phoneNumToPos = () => {
//   let phone = {};
//   for (let i = 1; i < 10; i++) {
//     let x = Math.floor((i - 1) / 3);
//     let y = (i - 1) % 3;
//     phone[i] = [x, y];
//   }
//   phone["0"] = [3, 1];
//   return phone;
// };

// function solution(numbers) {
//   let phoone = phoneNumToPos();

//   let pos = [
//     [1, 0],
//     [1, 2],
//   ];
//   let total = 0;

//   for (let i = 0; i < numbers.length; i++) {
//     let num = numbers[i];
//     const target = phoone[num];

//     [cnt, isLeft] = bfs(pos, target);
//     total += cnt;
//     isLeft ? (pos[0] = target) : (pos[1] = target);
//   }

//   return total;
// }

const makeKey = (num1, num2) => {
  return [num1, num2].join(",");
};
function solution(numbers) {
  const costs = [
    [1, 7, 6, 7, 5, 4, 5, 3, 2, 3],
    [7, 1, 2, 4, 2, 3, 5, 4, 5, 6],
    [6, 2, 1, 2, 3, 2, 3, 5, 4, 5],
    [7, 4, 2, 1, 5, 3, 2, 6, 5, 4],
    [5, 2, 3, 5, 1, 2, 4, 2, 3, 5],
    [4, 3, 2, 3, 2, 1, 2, 3, 2, 3],
    [5, 5, 3, 2, 4, 2, 1, 5, 3, 2],
    [3, 4, 5, 6, 2, 3, 5, 1, 2, 4],
    [2, 5, 4, 5, 3, 2, 3, 2, 1, 2],
    [3, 6, 5, 4, 5, 3, 2, 4, 2, 1],
  ];

  let weightObj = {};
  weightObj[makeKey(4, 6)] = 0;
  let key;
  for (let i = 0; i < numbers.length; i++) {
    let num = numbers[i];
    let tmpObj = {};
    for (let [p, w] of Object.entries(weightObj)) {
      let [l, r] = p.split(",");

      if (l === num) {
        key = makeKey(num, r);
        if (!tmpObj[key] || tmpObj[key] > w + 1) {
          tmpObj[key] = w + 1;
        }
      } else if (r === num) {
        key = makeKey(l, num);
        if (!tmpObj[key] || tmpObj[key] > w + 1) {
          tmpObj[key] = w + 1;
        }
      } else {
        let lKey = makeKey(num, r);
        let rKey = makeKey(l, num);

        if (!tmpObj[rKey] || tmpObj[rKey] > w + costs[r][num]) {
          tmpObj[rKey] = w + costs[r][num];
        }
        if (!tmpObj[lKey] || tmpObj[lKey] > w + costs[l][num]) {
          tmpObj[lKey] = w + costs[l][num];
        }
      }
    }

    weightObj = tmpObj;
  }

  return Math.min(...Object.values(weightObj));
}

console.log(solution("1756"));
