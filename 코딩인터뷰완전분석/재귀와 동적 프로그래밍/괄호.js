`문제 : n 쌍의 괄호로 만들 수 있는 모든 합당한 조합을 출력하라.
n = 3;
((())), ((),()), ()(()), ()()() 
`;

function solution(n) {
  const dfs = (str, openCnt) => {
    if (str.length === n * 2) {
      if (openCnt === 0) console.log(str);
      return;
    }
    if (n * 2 - str.length < openCnt) return;

    if (openCnt > 0) {
      dfs(str + ")", openCnt - 1);
    }
    dfs(str + "(", openCnt + 1);
  };

  dfs("", 0);
}

solution(3);
