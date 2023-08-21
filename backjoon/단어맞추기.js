let input = `4
HELLO
DRINK
SHUTTLE
ZOO`.split("\n");

const solution = () => {
  let n = +input[0];
  let result = [];
  for (let i = 1; i <= n; i++) {
    const charSplit = input[i].split("");
    const sort = charSplit.sort((a, b) => (a > b ? -1 : 1));
    if (input[i] === sort.join("")) {
      result.push(input[i]);
    } else {
      let char = input[i].split("");
      for (let j = char.length - 1; j > 0; j--) {
        //나보다 작은애가 있어야 다음 조합을 완성할 수 있음.
        if (char[j].charCodeAt() > char[j - 1].charCodeAt()) {
          const pre = char[j - 1].charCodeAt();
          for (let k = char.length - 1; k > j - 1; k--) {
            if (pre < char[k].charCodeAt()) {
              let tmp = char[j - 1];
              char[j - 1] = char[k];
              char[k] = tmp;
              result.push(
                char.slice(0, j).concat(char.slice(j).reverse()).join("")
              );
              break;
            }
          }
          break;
        }
      }
    }
  }
  return result.join("\n");
};

console.log(solution());
// SLEHTTU
