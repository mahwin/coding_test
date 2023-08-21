let input = `7 9
0 6
0 1 1
0 2 1
0 3 2
0 4 3
1 5 2
2 6 4
3 6 2
4 6 4
5 6 1
4 6
0 2
0 1 1
1 2 1
1 3 1
3 2 1
2 0 3
3 0 2
6 8
0 1
0 1 1
0 2 2
0 3 3
2 5 3
3 4 2
4 1 1
5 1 1
3 0 1
0 0
`.split("\n");

while (input.length) {
  const [N, M] = input.shift().split(" ").map(Number);
  if (N === 0 || M === 0) break;

  const [S, D] = input.shift().split(" ").map(Number);

  let infos = input.splice(0, M);
  let infoArr = [];
  infos.forEach((el) => {
    const [from, to, cost] = el.split(" ").map(Number);
  });
}
