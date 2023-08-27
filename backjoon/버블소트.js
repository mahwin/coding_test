let input = `3
1 1 1`.split("\n");

const solution = () => {
  const nums = input[1].split(" ").map(Number);

  let result = 0n;
  const mergeSort = (start, end) => {
    if (start < end) {
      const mid = Math.floor((start + end) / 2);

      mergeSort(start, mid);
      mergeSort(mid + 1, end);

      let [Lidx, Ridx] = [start, mid + 1];
      let sortedArr = [];
      while (Lidx <= mid && Ridx <= end) {
        if (nums[Lidx] <= nums[Ridx]) {
          sortedArr.push(nums[Lidx]);
          Lidx++;
        } else {
          sortedArr.push(nums[Ridx]);
          Ridx++;
          result += BigInt(mid - Lidx + 1);
        }
      }
      if (Lidx <= mid) {
        sortedArr = sortedArr.concat(nums.slice(Lidx, mid + 1));
      }
      if (Ridx <= end) {
        sortedArr = sortedArr.concat(nums.slice(Ridx, end + 1));
      }

      for (let i = 0; i < sortedArr.length; i++) {
        nums[start + i] = sortedArr[i];
      }
    }
  };

  mergeSort(0, Number(input[0]) - 1);

  console.log(result.toString());
};

solution();
