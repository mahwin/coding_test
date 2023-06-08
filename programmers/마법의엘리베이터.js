function solution(storey) {
  let result = 0;
  storey = storey.toString().split("").map(Number).reverse();
  storey.push(0);

  for (let i = 0; i < storey.length; i++) {
    const num = storey[i];
    if (num > 5) {
      result += 10 - storey[i];
      storey[i + 1]++;
    } else if (num < 5) result += storey[i];
    else {
      if (storey[i + 1] >= 5) {
        result += 10 - storey[i];
        storey[i + 1]++;
      } else {
        result += storey[i];
      }
    }
  }

  return result;
}
