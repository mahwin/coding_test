function solution(key, lock) {
  const keyLength = key.length;
  const lockLength = lock.length;
  const boardLength = 2 * (keyLength - 1) + lockLength;

  const ratator = (arr, keyLength) => {
    let copy = arr.map((row) => [...row]);
    copy.forEach((row, rIdx) => {
      row.forEach((col, cIdx) => {
        arr[cIdx][keyLength - 1 - rIdx] = col;
      });
    });
    return arr;
  };

  const expand = (lock, keyLength, lockLength, boardLength) => {
    const expandLock = Array.from({ length: boardLength }, () =>
      Array.from({ length: boardLength }).fill()
    );

    for (let row = keyLength - 1; row < keyLength - 1 + lockLength; row++) {
      for (let col = keyLength - 1; col < keyLength - 1 + lockLength; col++) {
        expandLock[row][col] = lock[1 - keyLength + row][1 - keyLength + col];
      }
    }
    return expandLock;
  };

  const validator = (board, keyLength, lockLength) => {
    for (let i = keyLength - 1; i < keyLength + lockLength - 1; i++) {
      for (let j = keyLength - 1; j < keyLength + lockLength - 1; j++) {
        if (board[i][j] !== 1) return false;
      }
    }

    return true;
  };

  const expandLock = expand(lock, keyLength, lockLength, boardLength);

  for (let rotate = 0; rotate < 4; rotate++) {
    key = rotate === 0 ? key : ratator(key, keyLength);

    for (let i = 0; i < boardLength - keyLength + 1; i++) {
      for (let j = 0; j < boardLength - keyLength + 1; j++) {
        const copyBoard = expandLock.map((arr) => [...arr]);
        for (let row = 0; row < keyLength; row++) {
          for (let col = 0; col < keyLength; col++) {
            let keyValue = key[row][col];
            let lockValue = copyBoard[i + row][j + col];
            if (keyValue === 1 && lockValue === 1) {
              copyBoard[i + row][j + col] = 2;
            } else if (keyValue === 1 && lockValue === 0) {
              copyBoard[i + row][j + col] = 1;
            }
          }
        }

        if (validator(copyBoard, keyLength, lockLength)) return true;
      }
    }
  }

  return false;
}

console.log(
  solution(
    [
      [0, 0, 0],
      [1, 0, 0],
      [0, 1, 1],
    ],
    [
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
    ]
  )
);

// [1, 0], [1, 1], [1, 2][(0, 1)], [1, 1], [2, 2];
