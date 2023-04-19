let n = Number(3);

const drawStar = (n) => {
  let colLen = 4 * n - 3;
  let rowLen = 2 * n - 2;
  let star = [];
  let evenPatten = Array.from({ length: colLen }, () => "*");
  let oddPatten = Array.from({ length: colLen }, () => " ");
  let middlePatten = Array.from({ length: colLen }, (_, i) => {
    if (i % 2 === 0) return "*";
    else return " ";
  });
  let patten;
  for (r = 0; r < rowLen; r++) {
    if (r % 2 === 0) {
      patten = [...evenPatten];
      const evenIdx = r / 2;
      for (let i = 0; i < evenIdx; i++) {
        patten[2 * i + 1] = " ";
        patten[colLen - 1 - (2 * i + 1)] = " ";
      }
    } else if (r % 2 === 1) {
      patten = [...oddPatten];
      const oddIdx = r / 2;
      for (let i = 0; i < oddIdx; i++) {
        patten[2 * i] = "*";
        patten[colLen - 1 - 2 * i] = "*";
      }
    }
    star.push(patten.join(""));
  }
  star.push(middlePatten.join(""));

  console.log(star.concat(star.slice(0, rowLen).reverse()).join("\n"));
};

drawStar(4);
