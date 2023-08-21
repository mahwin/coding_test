let input = `5 5
1 1 1
1 1 2
1 2 2
1 2 3
3 1`.split("\n");

const convert = (info) => info.split(" ").map(Number);

const solution = () => {
  const [n, m] = convert(input[0]);
  const trains = Array.from({ length: n }, () =>
    Array.from({ length: 20 }, () => 0)
  );

  for (let i = 1; i <= m; i++) {
    const [command, ...arr] = convert(input[i]);

    switch (command) {
      case 1:
        trains[arr[0] - 1][arr[1] - 1] = 1;
        break;
      case 2:
        trains[arr[0] - 1][arr[1] - 1] = 0;
        break;
      case 3:
        trains[arr[0] - 1].pop();
        trains[arr[0] - 1].unshift(0);
        break;
      case 4:
        trains[arr[0] - 1].shift();
        trains[arr[0] - 1].push(0);
        break;
    }
  }

  const trainSet = new Set();
  trains.forEach((train) => trainSet.add(train.join("")));
  return trainSet.size;
};

console.log(solution());
