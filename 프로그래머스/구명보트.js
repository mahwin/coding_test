function solution(people, limit) {
  people = people.sort((a, b) => a - b);
  let result = 0;
  let left = 0;
  let right = people.length - 1;

  while (left <= right) {
    result++;
    if (people[left] + people[right] <= limit) {
      left++;
      right--;
      continue;
    }
    right--;
  }
  return result;
}
