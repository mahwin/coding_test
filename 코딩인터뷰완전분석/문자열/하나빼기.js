`문제 : 두 개의 문자열이 주어질 때, 한번의 편집으로 같은 문자로 만들 수 있는 지 판별하는 함수를 작성하라.
 - 편집 : 삽입, 삭제, 교체
`;

const solution = (str1, str2) => {
  let [longString, shortString] =
    str1.length > str2.length ? [str1, str2] : [str2, str1];

  if (longString.length === shortString.length) {
    return check(longString, shortString);
  }

  return false;
};

function check(longStr, shortStr) {
  let diffCnt = 0;
  for (let i = 0; i < longStr.length; i++) {
    if (longStr[i + diffCnt] !== shortStr[i]) {
      if (diffCnt++ > 1) return false;
    }
  }
  return true;
}
