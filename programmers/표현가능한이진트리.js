const isTree = (binary) => {
  let center = (binary.length / 2) >> 0;
  let parent = binary[center];

  if (parent === "0") {
    for (let i = 0; i < binary.length; i++) {
      if (binary[i] === "1") return false;
    }
  }
  if (binary.length === 1) return true;

  return isTree(binary.slice(0, center)) && isTree(binary.slice(center + 1));
};

function solution(numbers) {
  let answer = [];
  for (const num of numbers) {
    let binary = num.toString(2);
    let binaryTreeLen = 0;

    for (let i = 0; i < 51; i++) {
      binaryTreeLen = 2 ** i - 1;
      if (binaryTreeLen >= binary.length) break;
    }
    let needLength = binaryTreeLen - binary.length;
    if (needLength) binary = "0".padEnd(needLength, "0") + binary;

    let isPosiible = isTree(binary);
    if (isPosiible) answer.push(1);
    else answer.push(0);
  }
  return answer;
}

console.log(solution([4]));
