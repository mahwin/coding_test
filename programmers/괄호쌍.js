function solution(n) {
  let answer = 0;

  const combination = (arr, pick) => {
    if (pick === 1) return arr.map((el) => [el]);
    let result = [];
    arr.forEach((fixed, index) => {
      let combis = combination(arr.slice(index + 1), pick - 1);
      combis.forEach((el) => result.push(el.concat(fixed)));
    });
    return result;
  };

  const conversion = (nums, Len) => {
    let result = Array.from({ length: Len }, () => "(");
    nums.forEach((num) => (result[num] = ")"));
    return result;
  };

  const check = (convert) => {
    let cnt = 0;
    for (let i = 0; i < convert.length; i++) {
      convert[i] === "(" ? cnt++ : cnt--;
      if (cnt < 0) return false;
    }
    return true;
  };

  let arr = Array.from({ length: n * 2 }, (_, i) => i);

  let combs = combination(arr, n);
  combs.forEach((nums) => {
    let convert = conversion(nums, n * 2);
    answer += check(convert);
  });
  return answer;
}
console.log(solution(5));
