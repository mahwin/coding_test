function solution(places) {
  //P 사람 O 빈 곳 X 파티션

  const check = (arr) => {
    arr = arr.map((str) => str.split(""));

    const needCheck = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const current = arr[row][col];
        if (current === "P") needCheck.push([row, col]);
      }
    }
    return bfs(needCheck, arr);
  };

  const bfs = (pos, arr) => {
    let directions = [
      [0, 1],
      [1, 0],
      [-1, 0],
      [0, -1],
    ];

    while (pos.length) {
      const [row, col] = pos.shift();
      for (let [x, y] of directions) {
        let nextR = row + x;
        let nextC = col + y;
        if (nextR < 0 || nextR >= 5 || nextC < 0 || nextC >= 5) continue; //경계 값 판별
        if (
          calDistance(row, col, nextR, nextC) <= 2 //거리 2 이하
        ) {
          let currentValue = arr[nextR][nextC];
          if (currentValue === "P") return 0;
          else if (currentValue === "X") continue;
          for (let [x, y] of directions) {
            let nextNextR = nextR + x;
            let nextNextC = nextC + y;

            if (
              nextNextR < 0 ||
              nextNextR >= 5 ||
              nextNextC < 0 ||
              nextNextC >= 5
            )
              continue; //경계 값 판별
            if (
              calDistance(row, col, nextNextR, nextNextC) <= 2 //거리 2 이하
            ) {
              if (row === nextNextR && col === nextNextC) continue; //왔던 곳으로 돌아가려면 건너
              let currentValue = arr[nextNextR][nextNextC];
              if (currentValue === "P") return 0;
              else if (currentValue === "X") continue;
              //왔던 곳으로 돌아가려면
            }
          }
        }
      }
    }
    return 1;
  };
  return places.map((place) => check(place));
}

const calDistance = (row, col, newRow, newCol) => {
  return Math.sqrt((newRow - row) ** 2 + (newCol - col) ** 2);
};

console.log(solution([["OPPPO", "XXXXX", "XXXXX", "XXXXX", "XXXXX"]]));
