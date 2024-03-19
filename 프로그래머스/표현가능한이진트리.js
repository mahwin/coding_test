const MAX_NUM = 10 ** 15;
const MAX_BINARY_LENGTH = MAX_NUM.toString(2).length;

function isTree(binary) {
  const mid = Math.floor(binary.length / 2);

  if (binary[mid] === "0") {
    for (let i = 0; i < binary.length; i++) {
      if (binary[i] === "1") return false;
    }
  }

  if (binary.length === 1) return true;
  return isTree(binary.slice(0, mid)) && isTree(binary.slice(mid + 1));
}

function paddingLeft(binary, binaryLength) {
  return "0".repeat(binaryLength - binary.length) + binary;
}

function solution(numbers) {
  const result = [];

  const MIN_BINARY_LENGTH = 7;

  for (const number of numbers) {
    const origin = number.toString(2);

    let binaryLen = 0;
    let depth = 0;

    while (binaryLen < origin.length) {
      binaryLen += 2 ** depth++;
    }
    const paddingBinary = paddingLeft(origin, binaryLen);
    result.push(isTree(paddingBinary) ? 1 : 0);
  }
  return result;
}
