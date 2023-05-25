const MAX = 10 ** 15;
const MAX_BINARY_LEN = MAX.toString(2).length;

const recur = (binary) => {
  const mid = (binary.length / 2) >> 0;
  const p = binary[mid];
  if (p === "0") {
    // 부모가 영이면 밑에 자식들은 다 영
    for (let i = 0; i < binary.length; i++) {
      if (binary[i] === "1") return false;
    }
  }
  if (binary.length === 1) return true;
  return recur(binary.slice(0, mid)) && recur(binary.slice(mid + 1));
};

function solution(numbers) {
  let answer = [];
  for (const num of numbers) {
    let binary = num.toString(2);
    let binaryLen = binary.length;
    let binaryTreeLen = 0;

    for (let i = 0; i <= MAX_BINARY_LEN; i++) {
      binaryTreeLen = 2 ** i - 1;
      if (binaryTreeLen >= binary.length) break;
    }
    let needLength = binaryTreeLen - binary.length;
    if (needLength) binary = "0".repeat(needLength) + binary;
    recur(binary) ? answer.push(1) : answer.push(0);
  }
  return answer;
}
