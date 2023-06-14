const sumMap = (n, n1, n2) => {
  const binaryArr = n1.toString(2).padStart(n, "0").split("");
  const binaryString = n2.toString(2).padStart(n, "0");
  for (let i = 0; i < binaryString.length; i++) {
    if (binaryString[i] === "1") binaryArr[i] = "1";
  }
  return binaryArr.map((el) => (el === "1" ? "#" : " ")).join("");
};

function solution(n, arr1, arr2) {
  const result = [];

  for (let i = 0; i < n; i++) {
    result.push(sumMap(n, arr1[i], arr2[i]));
  }
  return result;
}
