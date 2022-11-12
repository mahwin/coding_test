function solution(babbling) {
  let answer = 0;

  for (let word of babbling) {
    if (dupleAndOnlyNumberCheck(changeWord2Number(word))) {
      answer += 1;
    }
  }
  return answer;
}

function changeWord2Number(word) {
  //ayaayaye => 001
  let pronunciation = ["aya", "ye", "woo", "ma"];
  pronunciation.forEach((pro, idx) => {
    word = word.replaceAll(pro, idx.toString());
  });

  return word;
}

function dupleAndOnlyNumberCheck(string) {
  if (!onlyNumberCheck(string)) return false;
  for (let i = 0; i < string.length - 1; i++) {
    if (string[i] === string[i + 1]) {
      return false;
    }
  }
  return true;
}

function onlyNumberCheck(string) {
  const reg = /[^0-9]/g;
  return !reg.test(string);
}

///////////////////2번 째 풀이
// function solution(babbling) {
//   let answer = 0;
//   for (let i = 0; i < babbling.length; i++) {
//     if (canPronounce(babbling[i])) answer += 1;
//   }
//   return answer;
// }

// function canPronounce(bab) {
//   const twoAlpha = ["ye", "ma"];
//   const threeAlpha = ["aya", "woo"];
//   let beforeBab;
//   let flag = true;
//   while (bab.length !== 0) {
//     const two = bab.slice(0, 2);
//     const three = bab.slice(0, 3);

//     if (twoAlpha.includes(two) && beforeBab !== two) {
//       bab = bab.slice(2);
//       beforeBab = two;
//     } else if (threeAlpha.includes(three) && beforeBab !== three) {
//       bab = bab.slice(3);
//       beforeBab = three;
//     } else {
//       flag = false;
//       break;
//     }
//   }
//   return flag;
// }

console.log(solution(["aya", "yee", "u"]));
