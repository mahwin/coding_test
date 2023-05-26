const expParser = (expression) => {
  const result = [];
  let stack = "";
  for (let i = 0; i < expression.length; i++) {
    const cur = expression[i];
    //지금 값이 연산자에 포함되면 stack에 저장했던 값과 현재 연사자를 배열에 저장하고
    //stack은 초기화한다.
    if (["+", "-", "*"].includes(cur)) {
      result.push(stack);
      result.push(cur);
      stack = "";
    } else stack += cur;
  }
  //stack에 남아있는 숫자 포함
  result.push(stack);
  return result;
};

//백트래킹 돌면서 연사자를 뽑을 순서르 정한다.
const dfs = (v, permutations, opers) => {
  if (opers.length === 3) {
    permutations.push(opers);
    return;
  }
  for (let i = 0; i < 3; i++) {
    if (v[i]) continue;
    v[i] = true;
    dfs(v, permutations, opers.concat(i));
    v[i] = false;
  }
};

const calAbsolute = (expArr, per) => {
  const opers = "+-*";
  for (let i = 0; i < 3; i++) {
    const pickOper = opers[per[i]];
    let tmp = [];
    for (let j = 0; j < expArr.length; j++) {
      if (expArr[j] === pickOper) {
        tmp.push(eval(tmp.pop() + pickOper + expArr[j + 1]));
        j++;
      } else tmp.push(expArr[j]);
    }
    expArr = tmp;
  }

  return Math.abs(expArr[0]);
};

function solution(expression) {
  let result = 0;

  const expArr = expParser(expression);
  const v = Array.from({ length: 3 }, () => false);
  const permutations = [];

  dfs(v, permutations, []); // permutations 배열에 순열 채우기

  for (const per of permutations) {
    result = Math.max(result, calAbsolute(expArr, per));
  }

  return result;
}

console.log(solution("100-200*300-500+20"));
