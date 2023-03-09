function solution(nums) {
  nums = nums.sort((a, b) => a - b);
  console.log(nums);
  let target = 1;

  for (let i = 0; i < nums.length; i++) {
    if (target < nums[i]) {
      break;
    }
    target += nums[i];
  }

  console.log(target);
}
