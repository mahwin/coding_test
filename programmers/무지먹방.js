function solution(food_times, k) {
  let foods = food_times
    .map((time, index) => {
      return [index + 1, time];
    })
    .sort((a, b) => a[1] - b[1]);

  let pre = 0;
  for (let i = 0; i < food_times.length; i++) {
    const currentTime = foods[i][1];
    const remainFoodsLen = food_times.length - i;
    const eatTime = (currentTime - pre) * remainFoodsLen;
    pre = currentTime;

    if (k < eatTime) {
      foods = foods.slice(i).sort((a, b) => a[0] - b[0]);
      return foods[k % remainFoodsLen][0];
    }

    k -= eatTime;
  }

  return -1;
}

console.log(solution([3, 5, 1, 6, 5, 3], 20));

// 3:1 1:1 2:1
// [3,2,1]
// k=5 food Len 3
