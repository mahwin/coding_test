function solution(array) {
  let answer = 0;

  const counter7 = (num) => {
    let amount = 0;
    num
      .toString()
      .split("")
      .forEach((str) => {
        str === "7" ? amount++ : null;
      });
    return amount;
  };

  for (let num of array) {
    answer += counter7(num);
  }

  return answer;
}

///////

//function solution(array) {
//    return array.join('').split('7').length-1;
//}
