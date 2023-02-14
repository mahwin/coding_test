let input = "1010-10101+01010+000";

input = input.split("-");

// input = input.map((el)=> eval(el))
//  0이 앞에 올 경우 이진수로 바꿔서 연산해서 결과가 틀리게 나옴.

for (let i = 0; i < input.length; i++) {
  let el = input[i].split("+");
  if (el.length > 1) {
    input[i] = el.reduce((pre, cur) => (pre += Number(cur)), 0);
  }
}
let sum = Number(input[0]);
for (let i = 1; i < input.length; i++) {
  sum -= Number(input[i]);
}
console.log(sum);
