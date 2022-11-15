function solution(topping) {
  console.log(totalToppingNumber);
  const totalToppingNumber = [...new Set(topping)].length;
  console.log(totalToppingNumber);
  const toppingMap = new Map();
  topping.forEach((top) =>
    toppingMap.has(top)
      ? toppingMap.set(top, toppingMap.get(top))
      : toppingMap.set(top, 1)
  );
  let chulsooTopping = new Set();

  let result = 0;
  console.log("?");
  for (let top of topping) {
    console.log(top);
    chulsooTopping.add(top);
    const dongsangTopping = toppingMap.get(top);
    if (dongsangTopping === 1) toppingMap.delete(top);
    else toppingMap.set(top, toppingMap.get(top) - 1);

    if (chulsooTopping.size === toppingMap.size) {
      result++;
    } else if (chulsooTopping.size > toppingMap.size) {
      return result;
    }
  }
  return result;
}

solution([1, 2, 1, 3, 1, 4, 1, 2]);
