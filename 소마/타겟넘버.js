function solution(numbers, target) {
  const len = numbers.length;

  let answer = 0;
  const dfs = (sum, i) => {
    if (len === i) {
      if (target === sum) answer++;
      return;
    }

    dfs(sum + numbers[i], i + 1);
    dfs(sum - numbers[i], i + 1);
  };

  dfs(0, 0);
  return answer;
}

console.log(solution([1, 1, 1, 1, 1], 3));
