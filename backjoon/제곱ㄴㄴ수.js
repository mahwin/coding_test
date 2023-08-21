function sol(input) {
  let [init, end] = input.split(" ").map(Number);
  let total = end - init + 1;

  const board = new Array(total).fill(false);

  let sqrt = Math.floor(Math.sqrt(end));

  for (let i = 2; i <= sqrt; i++) {
    let pow = i * i;

    let start = init % pow == 0 ? init / pow : Math.ceil(init / pow);

    for (let j = start; j * pow <= end; j++) {
      board[j * pow - init] = true;
    }
  }
  let result = 0;

  board.forEach((el) => {
    if (!el) result++;
  });
  return result;
}

let input = "1 1000";
// let input = `2148229801 2148229801`;
console.log(sol(input));
