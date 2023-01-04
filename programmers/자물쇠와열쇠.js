const rotator = (key, keyLength) => {
  const copyKey = Array.from({ length: keyLength }, () =>
    Array.from({ length: keyLength }, () => undefined)
  );
  for (let row = 0; row < keyLength; row++) {
    for (let col = 0; col < keyLength; col++) {
      copyKey[col][keyLength - 1 - row] = key[row][col];
    }
  }
  return copyKey;
};

const exPandLock = (keyLength, locLength, lock) => {
  const sidePadding = "1"
    .padStart(keyLength - 1, "1")
    .split("")
    .map(Number);

  const rowPadding = "1"
    .padStart((keyLength - 1) * 2 + locLength, "1")
    .split("")
    .map(Number);

  const upDownArr = Array.from({ length: keyLength - 1 }, () => [
    ...rowPadding,
  ]);

  lock = lock.map((row) => [...sidePadding, ...row, ...sidePadding]);

  lock = [...upDownArr, ...lock, ...upDownArr];
  return lock;
};

const isValid = (rock, key, rowInit, colInit, keyLength, lockLength) => {
  let copyLock = rock.map((r) => [...r]);

  for (let row = 0; row < keyLength; row++) {
    for (let col = 0; col < keyLength; col++) {
      let lockRow = row + rowInit;
      let lockCol = col + colInit;

      if (key[row][col] === 1 && copyLock[lockRow][lockCol] === 1) {
        copyLock[lockRow][lockCol] = 2;
      } else if (key[row][col] === 1) {
        copyLock[lockRow][lockCol] = 1;
      }
    }
  }

  for (let row = keyLength - 1; row < keyLength + lockLength - 1; row++) {
    for (let col = keyLength - 1; col < keyLength + lockLength - 1; col++) {
      if (copyLock[row][col] !== 1) return false;
    }
  }
  return true;
};

function solution(key, lock) {
  const keyLength = key.length;
  const lockLength = lock.length;

  const expandLock = exPandLock(keyLength, lockLength, lock);

  for (let circle = 0; circle < 4; circle++) {
    key = circle === 0 ? key : rotator(key, keyLength);
    for (let row = 0; row < expandLock.length - keyLength + 1; row++) {
      for (let col = 0; col < expandLock.length - keyLength + 1; col++) {
        if (isValid(expandLock, key, row, col, keyLength, lockLength)) {
          return true;
        }
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
