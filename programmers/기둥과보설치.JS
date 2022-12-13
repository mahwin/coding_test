// function solution(n, build_frame) {
//   let answer = [[]];

//   //a 0 기둥 1 보
//   //b 0 삭제 1 설치
//   //기둥 => 바닥 or 보 or 기둥 위
//   //보는 기둥 위 or 양쪽 끝이 다른 보와 연결

//   const searcher = (xya, build) => {
//     if (build.includes(xya)) return true;
//     else return false;
//   };

//   const destroy = (xya, build) => {
//     build.splice(build.indexOf(xya), 1);
//     return build;
//   };

//   const build = [];
//   for (let xyab of build_frame) {
//     let [x, y, a, b] = xyab;
//     let xya = [x, y, a].join("");
//     if (b === 0) {
//       if (a === 0) {
//         //기둥의 경우
//         //위에 기둥이면 양쪽에 보가 연결되어있거나 아니면 보가 기둥으로 받쳐지면 삭제가능 아니면 X
//         //위에 보면
//       }
//       if (a === 1) {
//         //보의 경우
//         //보 위의 기둥이 있다면 밑에 기둥이 보위의 기둥을 받치면 제거 가능
//         //연결된 보에 연결된 기둥이 없으면 못 지움
//         const leftColumn = searcher([x, y, 0].join(""), build);
//         const rightColumn = searcher([x + 1, y, 0].join(""), build);
//         const leftBo = searcher([x - 1, y, 1].join(""), build);
//         const rightBo = searcher([x + 1, y, 1].join(""), build);
//         if (leftColumn && !searcher([x, y - 1, 0].join(""), build)) {
//           continue;
//         }
//         if (rightColumn && !searcher([x + 1, y - 1, 0].join(""), build)) {
//           continue;
//         }
//         if (leftBo) {
//           if (
//             searcher([x - 1, y - 1, 0].join(""), build) ||
//             searcher([x, y - 1, 0].join(""), build)
//           ) {
//             continue;
//           }
//         }
//         if (rightBo) {
//           if (
//             searcher([x + 1, y - 1, 0].join(""), build) ||
//             searcher([x + 2, y - 1, 0].join(""), build)
//           ) {
//             continue;
//           }
//         }
//         if (rightColumn && !searcher([x + 1, y - 1, 0].join(""), build)) {
//           continue;
//         }
//         destroy(xya, build);
//       }
//     }
//     if (b === 1) {
//       //기둥 생성
//       if (a === 0) {
//         if (
//           //바닥 or 밑에 기둥 or 옆에 보
//           y === 0 ||
//           searcher([x, y - 1, 0].join(""), build) ||
//           searcher([x - 1, y, 1].join(""), build)
//         ) {
//           build.push(xya);
//         }
//       }
//       //보 생성
//       if (a === 1) {
//         //밑에 기둥 or 양쪽에 보
//         if (searcher([x, y - 1, 0].join(""), build)) {
//           build.push(xya);
//         } else if (
//           searcher([x - 1, y, 1].join(""), build) &&
//           searcher([x + 1, y, 1].join(""), build)
//         ) {
//           build.push(xya);
//         }
//       }
//     }
//   }
//   console.log(build);
// }

function solution(n, build_frame) {
  let pillar = Array.from({ length: n + 2 }, () =>
    Array.from({ length: n + 2 }, () => 0)
  );
  let bo = Array.from({ length: n + 2 }, () =>
    Array.from({ length: n + 2 }, () => 0)
  );

  const canBuildPillar = (x, y) => {
    if (y === 0 || pillar[x][y - 1] === 1) return true;
    else if ((x > 0 && bo[x - 1][y]) || bo[x][y]) return true;
    return false;
  };
  const canBuildBo = (x, y) => {
    if (pillar[x][y - 1] || pillar[x + 1][y - 1]) return true;
    else if (x > 0 && bo[x - 1][y] && bo[x + 1][y]) return true;
    return false;
  };

  const canDelete = () => {
    for (let row = 0; row < n + 1; row++) {
      for (let col = 0; col < n + 1; col++) {
        if (pillar[row][col] === 1 && canBuildPillar(row, col) === false) {
          return false;
        }
        if (bo[row][col] === 1 && canBuildBo(row, col) === false) {
          return false;
        }
      }
    }
    return true;
  };

  //a 0 기둥 1 보
  //b 0 삭제 1 설치
  //기둥 => 바닥 or 보 or 기둥 위
  //보는 기둥 위 or 양쪽 끝이 다른 보와 연결

  build_frame.forEach(([x, y, a, b]) => {
    if (b === 1) {
      //건축물 생성
      if (a === 0) {
        // 기둥 생성
        if (canBuildPillar(x, y)) {
          pillar[x][y] = 1;
        }
      } else {
        // 보 생성
        if (canBuildBo(x, y)) {
          bo[x][y] = 1;
        }
      }
    } else {
      //건물 제거
      if (a === 0) {
        //기둥 제거
        pillar[x][y] = 0;
        if (!canDelete()) {
          pillar[x][y] = 1;
        }
      } else {
        //보 제거
        bo[x][y] = 0;
        if (!canDelete()) {
          bo[x][y] = 1;
        }
      }
    }
  });

  let answer = [];

  for (let x = 0; x <= n; x++) {
    for (let y = 0; y <= n; y++) {
      if (pillar[x][y]) answer.push([x, y, 0]);
      if (bo[x][y]) answer.push([x, y, 1]);
    }
  }

  return answer;
}

solution(5, [
  [0, 0, 0, 1],
  [2, 0, 0, 1],
  [4, 0, 0, 1],
  [0, 1, 1, 1],
  [1, 1, 1, 1],
  [2, 1, 1, 1],
  [3, 1, 1, 1],
  [2, 0, 0, 0],
  [1, 1, 1, 0],
  [2, 2, 0, 1],
]);
