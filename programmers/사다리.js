// const getParent = (parent, x) => {
//   if (parent[x] === x) return x;
//   parent[x] = getParent(parent, parent[x]);
//   return;
// };

// const unionParent = (parent, a, b) => {
//   a = getParent(parent, a);
//   b = getParent(parent, b);

//   if (a < b) parent[b] = a;
//   else parent[a] = b;
// };

// const findParent = (parent, a, b) => {
//   a = getParent(parent, a);
//   b = getParent(parent, b);

//   if (a === b) return true;
//   return false;
// };

// function solution(land, height) {
//   let visited = Array.from({ length: land.length }, () =>
//     Array.from({ length: land[0].length }, () => false)
//   );

//   dfs = (x, y) => {
//     const dirs = [
//       [0, 1],
//       [1, 0],
//       [-1, 0],
//       [0, -1],
//     ];

//     for (let [addX, addY] of dirs) {
//       const [nextX, nextY] = [x + addX, y + addY];

//       if (
//         nextX >= 0 &&
//         nextX < land.length &&
//         nextY >= 0 &&
//         nextY < land[0].length &&
//         !visited[nextX][nextY]
//       ) {
//         if (Math.abs(land[x][y] - land[nextX][nextY]) <= height) {
//           visited[nextX][nextY] = true;

//           tmp.push([nextX, nextY]);
//           dfs(nextX, nextY);
//         }
//       }
//     }
//   };

//   const findMinPrice = (arr1, arr2) => {
//     let price = Infinity;
//     const dirs = [
//       [0, 1],
//       [1, 0],
//       [-1, 0],
//       [0, -1],
//     ];
//     // 배열 값 비교 위해 스트링 화
//     arr2 = arr2.map((el) => el.join(","));

//     for (let [x, y] of arr1) {
//       for (let [addX, addY] of dirs) {
//         const [nextX, nextY] = [x + addX, y + addY];
//         if (arr2.includes([nextX, nextY].join(","))) {
//           price = Math.min(price, Math.abs(land[x][y] - land[nextX][nextY]));
//         }
//       }
//     }
//     return price;
//   };

//   let sameHeightObj = {};
//   let tmp = [];

//   for (let row = 0; row < land.length; row++) {
//     for (let col = 0; col < land[0].length; col++) {
//       if (visited[row][col]) continue;

//       tmp = [[row, col]];

//       dfs(row, col);
//       sameHeightObj[[row, col].join("")] = tmp;
//     }
//   }

//   let weightArr = [];

//   const nodes = Object.keys(sameHeightObj);

//   nodes.forEach((node, i) =>
//     nodes.slice(i + 1).forEach((next, j) => {
//       if (sameHeightObj[node].length > 0 && sameHeightObj[next].length > 0) {
//         const minPrice = findMinPrice(sameHeightObj[node], sameHeightObj[next]);
//         if (minPrice !== Infinity) {
//           weightArr.push([i, i + j + 1, minPrice]);
//         }
//       }
//     })
//   );

//   weightArr.sort((a, b) => a[2] - b[2]);

//   let parent = [];
//   for (let i = 0; i < nodes.length; i++) {
//     parent[i] = i;
//   }

//   let answer = 0;

//   let cnt = 0;

//   for (let i = 0; i < weightArr.length; i++) {
//     if (!findParent(parent, weightArr[i][0], weightArr[i][1])) {
//       answer += weightArr[i][2];

//       unionParent(parent, weightArr[i][0], weightArr[i][1]);
//       cnt++;
//     }
//     if (cnt === nodes.length - 1) break;
//   }

//   return answer;
// }

// console.log(
//   solution(
//     [
//       [10, 11, 10, 11],
//       [2, 21, 20, 10],
//       [1, 20, 21, 11],
//       [2, 1, 2, 1],
//     ],
//     1
//   )
// );

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

// bfs로 구역 나누기.
function devideTheLand(land, height) {
  const N = land.length;
  const devidedLand = Array.from({ length: N }, () => []);

  let number = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!devidedLand[i][j]) {
        number += 1;
        devidedLand[i][j] = number;
        const queue = [[i, j]];
        let index = 0;

        while (queue.length > index) {
          const [y, x] = queue[index++];

          for (let k = 0; k < 4; k++) {
            const nx = x + dx[k];
            const ny = y + dy[k];

            if (
              nx >= 0 &&
              ny >= 0 &&
              nx < N &&
              ny < N &&
              !devidedLand[ny][nx]
            ) {
              if (height >= Math.abs(land[y][x] - land[ny][nx])) {
                devidedLand[ny][nx] = number;
                queue.push([ny, nx]);
              }
            }
          }
        }
      }
    }
  }

  return [devidedLand, number];
}

// bfs로 서로 다른 구역 이동 간선 만들기
function makeEdges(land, devidedLand) {
  const N = land.length;
  const edges = [];
  const visit = Array.from({ length: N }, () => Array(N).fill(false));
  visit[0][0] = true;
  const queue = [[0, 0]];
  let index = 0;

  while (queue.length > index) {
    const [y, x] = queue[index++];
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && ny >= 0 && nx < N && ny < N) {
        const nowLandNum = devidedLand[y][x];
        const nextLandNum = devidedLand[ny][nx];
        const diff = Math.abs(land[y][x] - land[ny][nx]);
        if (nowLandNum !== nextLandNum) {
          edges.push([nowLandNum, nextLandNum, diff]);
          edges.push([nextLandNum, nowLandNum, diff]);
        }
        if (!visit[ny][nx]) {
          visit[ny][nx] = true;
          queue.push([ny, nx]);
        }
      }
    }
  }

  return edges;
}

function unionFind(n) {
  this.parents = Array.from({ length: n }, (_, i) => i);

  this.getParent = (num) => {
    if (num === this.parents[num]) return num;
    return (this.parents[num] = this.getParent(this.parents[num]));
  };

  this.find = (a, b) => {
    const aParent = this.getParent(a);
    const bParent = this.getParent(b);

    return aParent === bParent;
  };

  this.unionParent = (a, b) => {
    const aParent = this.getParent(a);
    const bParent = this.getParent(b);

    if (aParent > bParent) this.parents[aParent] = bParent;
    else this.parents[bParent] = aParent;
  };
}

function solution(land, height) {
  var answer = 0;

  const [devidedLand, landCnt] = devideTheLand(land, height);
  const edges = makeEdges(land, devidedLand);
  const uf = new unionFind(landCnt + 1);

  edges.sort((a, b) => a[2] - b[2]);
  let cnt = 0;
  for (let i = 0; i < edges.length; i++) {
    const [from, to, cost] = edges[i];

    if (!uf.find(from, to)) {
      answer += cost;
      uf.unionParent(from, to);
      cnt += 1;
    }

    if (cnt === landCnt - 1) break;
  }
  return answer;
}
