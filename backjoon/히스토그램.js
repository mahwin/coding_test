let input = `7
2
1
4
5
1
3
3`.split("\n");

class Data {
  constructor(index, height) {
    this.index = index;
    this.height = height;
  }
}

const solution = () => {
  const n = Number(input[0]);
  const heights = input.slice(1).map(Number);
  heights.push(0);
  const stack = [new Data(0, heights[0])]; // index,height
  let max = 0;

  for (let i = 1; i <= n; i++) {
    if (stack.at(-1).height < heights[i]) {
      // 다음 막대의 높이가 더 높다면 미리 계산하는 행위가 손해임.
      stack.push(new Data(i, heights[i]));
      continue;
    }
    let preIdx = i;
    while (stack.length && stack.at(-1).height >= heights[i]) {
      const { index, height } = stack.pop();
      preIdx = index;
      max = Math.max(max, (i - index) * height);
    }
    stack.push(new Data(preIdx, heights[i]));
  }
  return max;
};

console.log(solution());
