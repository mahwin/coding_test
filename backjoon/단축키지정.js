let input = `8
New window
New file
Copy
Undo
Format
Font
Cut
Paste`.split("\n");

const solution = () => {
  let savedKeys = new Set();
  let N = parseInt(input.shift(), 10);
  for (let i = 0; i < N; i++) {
    const str = input[i];
    console.log(format(str, savedKeys));
  }
};

const format = (str, savedKeys) => {
  const strArr = str.split(" ");

  for (let j = 0; j < strArr.length; j++) {
    const startAlpha = strArr[j][0].toLowerCase();
    if (!savedKeys.has(startAlpha)) {
      savedKeys.add(startAlpha);
      strArr[j] = `[${strArr[j][0]}]${strArr[j].slice(1)}`;
      return strArr.join(" ");
    }
  }
  for (let k = 0; k < str.length; k++) {
    if (str[k] === " ") continue;
    const alpha = str[k].toLowerCase();
    if (!savedKeys.has(alpha)) {
      savedKeys.add(alpha);
      return `${str.slice(0, k)}[${str.slice(k, k + 1)}]${str.slice(k + 1)}`;
    }
  }
  return str;
};

solution();
