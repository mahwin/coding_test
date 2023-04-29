function solution(sequence, k) {
  let acc = sequence[0];

  let result = [0, sequence.length - 1];
  let [left, right] = [0, 0];

  while (left < sequence.length) {
    if (acc < k) {
      right++;
      acc += sequence[right];
    } else {
      if (acc === k) {
        if (result[1] - result[0] > right - left) {
          result = [left, right];
        }
      }

      acc -= sequence[left];
      left++;
    }
  }

  return result;
}
