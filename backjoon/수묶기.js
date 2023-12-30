let input = `10
-1
-2
-3
-4
-5
-6
-7
-8
-9
-10`.split("\n");

const solution = () => {
  input.shift();
  input = input.map(Number).sort((a, b) => a - b);

  const minusArr = [];
  let plusArr = [];
  input.forEach((el) => {
    if (el > 0) plusArr.push(el);
    else minusArr.push(el);
  });
  plusArr = plusArr.reverse();
  let result = 0;
  for (let i = 0; i < minusArr.length; i++) {
    if (i + 1 < minusArr.length) {
      const [a, b] = [minusArr[i], minusArr[i + 1]];
      i++;
      result += Math.max(a * b, a + b);
      console.log(a, b, result);
    } else {
      result += minusArr[i];
      console.log(minusArr[i], result);
    }
  }

  for (let i = 0; i < plusArr.length; i++) {
    if (i + 1 < plusArr.length) {
      const [a, b] = [plusArr[i], plusArr[i + 1]];
      i++;
      result += Math.max(a * b, a + b);
    } else {
      result += plusArr[i];
    }
  }
  console.log(result);
};

solution();
