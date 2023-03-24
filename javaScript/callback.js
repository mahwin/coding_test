// arr.filter(callback(element[, index[, array]])[, thisArg])
// filter안에 사용되는 함수가 callback함수  fn()=>{}

const words = [
  "spray",
  "limit",
  "elite",
  "exuberant",
  "destruction",
  "present",
];

function callback(element) {
  return element.length > 6 ? true : false;
}

// const answer = words.filter(e=>e.length >6);
const answer = words.filter(callback);

console.log(answer); // Array [ 'exuberant', 'destruction', 'present' ]

function myfilter(origin, callback) {
  const result = [];
  for (let i = 0; i < origin.length; i++) {
    const current = origin[i];
    if (callback(current)) result.push(current);
  }
  return result;
}

const myAnswer = myfilter(words, (e) => e.length > 6);
console.log(myAnswer);
