function zeroPaddingFromLeft(origin, paddingNum) {
  return "0".repeat(paddingNum) + origin;
}

function isFerpectBinary(binary) {
  if (binary.length === 1) return true;

  let mid = Math.floor(binary.length / 2);

  if (binary[mid] === "0") {
    for (let i = 0; i < binary.length; i++) {
      if (binary[i] === "1") return false;
    }
  }
  return (
    isFerpectBinary(binary.slice(0, mid)) &&
    isFerpectBinary(binary.slice(mid + 1))
  );
}

function solution(numbers) {
  return numbers.map((num) => {
    let binary = num.toString(2);

    let binaryLen = 0;
    let depth = 0;

    while (binaryLen < binary.length) {
      binaryLen += 2 ** depth++;
    }

    const paddingNum = binaryLen - binary.length;
    const paddingBinary = zeroPaddingFromLeft(binary, paddingNum);
    return isFerpectBinary(paddingBinary) ? 1 : 0;
  });
}
