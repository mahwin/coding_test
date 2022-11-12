function solution(want, number, discount) {
  let answer = 0;
  let wantObj = {};
  want.forEach((num, idx) => (wantObj[num] = idx));
  let discountArr = Array.from({ length: number.length }, () => 0);
  let init = discount.slice(0, 10);

  init.forEach((dis) => {
    if (want.includes(dis)) {
      discountArr[wantObj[dis]] += 1;
    }
  });
  if (arrIncludeArr(discountArr, number)) answer += 1;
  for (let date = 1; date <= discount.length - 10; date++) {
    const minusItem = discount[date - 1];
    const addItem = discount[date + 9];
    if (want.includes(minusItem)) {
      discountArr[wantObj[minusItem]] += -1;
    }
    if (want.includes(addItem)) {
      discountArr[wantObj[addItem]] += 1;
    }
    if (arrIncludeArr(discountArr, number)) answer += 1;
  }
  return answer;
}

function arrIncludeArr(discountArr, number) {
  //arr1이 arr2를 포함하고 있으면 true
  // arr1 =[1,2,3] arr2 =[1,1,1]이면 포함

  let flag = true;
  discountArr.forEach((num, idx) => {
    if (num < number[idx]) {
      flag = false;
    }
  });
  return flag;
}

console.log(
  solution(
    ["banana"],
    [10],
    [
      "banana",
      "banana",
      "banana",
      "banana",
      "banana",
      "banana",
      "banana",
      "banana",
      "banana",
      "banana",
      "banana",
      "banana",
      "banana",
      "banana",
    ]
  )
);
