// const alpha ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// const sisor =(char,n)=>{
//     const charIdx = alpha.indexOf(char.toUpperCase());
//     const newIdx = (charIdx + n )%alpha.length;
//     return newIdx
// }

// function solution(s, n) {
//     let result = [];
//     for (let i=0; i<s.length; i ++){
//         if(s[i]==' ') result.push(s[i]);
//         else if ('A'.charCodeAt() <= s[i].charCodeAt() && s[i].charCodeAt() <='Z'.charCodeAt()){
//             //대문자면
//             result.push(String.fromCharCode('A'.charCodeAt() + sisor(s[i],n)));
//         }else {
//             //소문자면
//             result.push(String.fromCharCode('a'.charCodeAt() + sisor(s[i],n)));
//         }
//     }
//     return result.join('')
// }

const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const sisor = (char, n) => {
  const charIdx = alpha.indexOf(char.toUpperCase());
  const newIdx = (charIdx + n) % alpha.length;
  return newIdx;
};

function solution(s, n) {
  let result = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] == " ") {
      result.push(s[i]);
      continue;
    }
    const start = s[i].toUpperCase() == s[i] ? "A" : "a";
    result.push(String.fromCharCode(start.charCodeAt() + sisor(s[i], n)));
  }
  return result.join("");
}
