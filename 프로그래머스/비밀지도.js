function padding(n, binary) {
  return "0".repeat(n - binary.length) + binary;
}
function solution(n, arr1, arr2) {
  const result = [];

  for (let i = 0; i < n; i++) {
    const binary1 = padding(n, arr1[i].toString(2));
    const binary2 = padding(n, arr2[i].toString(2));
    let str = "";
    for (let j = 0; j < n; j++) {
      str += binary1[j] === "0" && binary2[j] === "0" ? " " : "#";
    }
    result.push(str);
  }
  return result;
}
