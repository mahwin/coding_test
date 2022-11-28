function solution(arrayA, arrayB) {
  //한 수의 약수들 리턴 하는 함수
  const divider = (num) => {
    let dividers = [];
    for (let i = 2; i <= num; i++) {
      num % i === 0 ? dividers.push(i) : null;
    }
    return dividers;
  };
  //공통 약수 찾아주는 함수
  const commonDivider = (arr) => {
    let commonDividers = [];
    const dividers = divider(arr[0]);
    dividers.forEach((divider) => {
      let dividableList = arr.filter((num) => num % divider === 0);
      dividableList.length === arr.length ? commonDividers.push(divider) : null;
    });
    return commonDividers;
  };

  //한 배열이 특정한 수를 약수로 가지지 않는 것을 확인하는 함수
  const notDivider = (num, arr) => {
    let flag = true;
    arr.forEach((element) => {
      element % num === 0 ? (flag = false) : null;
    });
    return flag;
  };

  //A적용
  const commonDividersA = commonDivider(arrayA);

  let answerA = commonDividersA.filter((CD) => notDivider(CD, arrayB));
  //B적용
  const commonDividersB = commonDivider(arrayB);
  let answerB = commonDividersB.filter((CD) => notDivider(CD, arrayB));
  const concanArr = answerA.concat(answerB);
  if (concanArr.length === 0) return 0;
  return Math.max(...concanArr);
}
