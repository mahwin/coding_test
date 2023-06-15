function solution(ingredient) {
  let hambuck = 0;
  let stack = [];
  for (let i = 0; i < ingredient.length; i++) {
    stack.push(ingredient[i]);

    while (
      stack.length >= 4 &&
      stack.slice(stack.length - 4, stack.length).join("") == "1231"
    ) {
      stack.pop();
      stack.pop();
      stack.pop();
      stack.pop();
      hambuck++;
    }
  }
  return hambuck;
}
