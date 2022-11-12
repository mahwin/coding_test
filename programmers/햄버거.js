function solution(ingredient) {
  let answer = 0;
  let arr = [];
  ingredient.forEach((food) => {
    arr.push(food);
    if (arr.length >= 4) {
      [completeHambucs, arr] = packingHambuck(arr);
      answer += completeHambucs;
    }
  });
  return console.log(answer);
}

function packingHambuck(arr) {
  let completeHambucs = 0;
  while (true) {
    const len = arr.length;
    const endIngredient = arr.slice(len - 4, len);
    if (endIngredient.join("") === "1231") {
      completeHambucs += 1;
      arr.splice(len - 4);
    } else break;
  }
  return [completeHambucs, arr];
}

solution([2, 1, 1, 2, 3, 1, 2, 3, 1]);
