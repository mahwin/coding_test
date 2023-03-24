const nums = [1, 2, 3, 4, 5, 6, 7, 8];

Array.prototype.myReduce = function (callback, initialValue) {
  let i = 0;
  let accumulator;
  initialValue
    ? (accumulator = initialValue)
    : ([i, accumulator] = [1, this[0]]);
  console.log(i, accumulator, this);
  for (; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
};

console.log(nums.myReduce((p, c) => (p += c), -36));
