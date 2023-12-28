let input = `2
XXXY
2
1`.split("\n");

const solution = () => {
  const n = Number(input.shift());
  const k = Number(input.pop());

  let maxLen = 0;
  for (let i = 0; i < n; i++) {
    maxLen = Math.max(maxLen, input[i].length);
  }

  input = input.map((el) => el.padStart(maxLen, "."));

  const count = Array.from({ length: 36 }, () => ({
    idxArr: Array.from({ length: maxLen }, () => 0),
    total: 0n,
  }));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < maxLen; j++) {
      const char = input[i][j];

      if (char === ".") continue;
      const convertIdx = convert(char);

      count[convertIdx].idxArr[j]++;
      count[convertIdx].total +=
        BigInt(35 - convertIdx) * 36n ** BigInt(maxLen - j - 1);
    }
  }

  for (let i = 0; i < k; i++) {
    let [maxArr, maxTotal, idx] = [[], 0n, 0];
    for (let j = 0; j < 35; j++) {
      const { idxArr, total } = count[j];
      if (total > maxTotal) {
        idx = j;
        maxTotal = total;
        maxArr = [...idxArr];
      }
    }

    if (maxArr.length == 0) continue;

    count[idx] = { idxArr: Array.from({ length: maxLen }, () => 0), total: 0n };

    for (let l = 0; l < maxLen; l++) {
      count[35].idxArr[l] += maxArr[l];
    }
  }
  let total = 0n;

  for (let i = 0; i < 36; i++) {
    for (let j = 0; j < maxLen; j++) {
      total += BigInt(i * count[i].idxArr[j]) * 36n ** BigInt(maxLen - j - 1);
    }
  }

  console.log(toBase36(total));
};

const convert = (char) => {
  // A => 10
  // B => 11

  if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(char))
    return Number(char);
  else return char.charCodeAt() - "A".charCodeAt() + 10;
};

solution();

function toBase36(number) {
  if (number === 0n) {
    return "0";
  }

  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";

  while (number > 0n) {
    const remainder = number % 36n;
    result = digits[Number(remainder)] + result;
    number = number / 36n;
  }

  return result;
}
