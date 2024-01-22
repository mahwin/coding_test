let input = `3
asvdge ef ofmdofn
xvssc kxvbv
hull full suua pmlu`.split("\n");

const solution = () => {
  const n = +input.shift();
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(check(input[i]));
  }
  console.log(result.join("\n"));
};

const check = (strings) => {
  let result = {};
  strings.split("").forEach((char) => {
    if (char !== " ") {
      if (result[char]) {
        result[char] += 1;
      } else {
        result[char] = 1;
      }
    }
  });
  let max = 0;
  let alphas = [];
  Object.keys(result).forEach((key) => {
    if (result[key] > max) {
      max = result[key];
      alphas = [key];
    } else if (result[key] === max) {
      alphas.push(key);
    }
  });
  if (alphas.length > 1) {
    return "?";
  } else {
    return alphas[0];
  }
};

solution();
