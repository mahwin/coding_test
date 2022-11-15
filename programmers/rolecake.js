function solution(topping) {
  const totalToppingNumber = new Set(topping).size;
  const toppingMap = new Map();
  topping.forEach((top) =>
    toppingMap.has(top)
      ? toppingMap.set(top, toppingMap.get(top) + 1)
      : toppingMap.set(top, 1)
  );

  let chulsooTopping = new Set();

  let result = 0;
  for (let top of topping) {
    chulsooTopping.add(top);
    const dongsaengTopping = toppingMap.get(top);
    if (dongsaengTopping === 1) toppingMap.delete(top);
    else toppingMap.set(top, toppingMap.get(top) - 1);

    if (chulsooTopping.size === toppingMap.size) {
      result++;
    } else if (chulsooTopping.size > toppingMap.size) {
      return console.log(result);
    }
  }
  return console.log(result);
}

solution([1, 2, 1, 3, 1, 4, 1, 2]);
