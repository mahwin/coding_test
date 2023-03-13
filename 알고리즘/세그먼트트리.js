function segment_sum(i) {
  let result = 0;
  while (i > 0) {
    result += tree[i];
    i -= i & -i;
  }
  return result;
}

function interval_sum(a, b) {
  return segment_sum(b) - segment_sum(a - 1);
}

function update(i, diff) {
  while (i <= n) {
    tree[i] += diff;
    i += i & -i;
  }
}
