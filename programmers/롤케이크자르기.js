function solution(topping) {
  const toppingMap = new Map();

  topping.forEach((el) => {
    if (toppingMap.has(el)) {
      toppingMap.set(el, toppingMap.get(el) + 1);
    } else toppingMap.set(el, 1);
  });

  let result = 0;
  let chulsuSet = new Set();
  for (const top of topping) {
    chulsuSet.add(top);
    if (toppingMap.get(top) == 1) {
      toppingMap.delete(top);
    } else {
      toppingMap.set(top, toppingMap.get(top) - 1);
    }
    if (chulsuSet.size === toppingMap.size) result++;
  }

  return result;
}
