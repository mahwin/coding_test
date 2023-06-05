const discount = [10, 20, 30, 40];

function solution(users, emoticons) {
  let result = [0, 0];
  let emoLen = emoticons.length;
  let disTmp = [];

  const cal = () => {
    let result = [0, 0]; //plus가입한 사람 수, 총 비용
    for (let i = 0; i < users.length; i++) {
      let money = 0;
      let isSign = false;
      for (let j = 0; j < emoLen; j++) {
        if (users[i][0] <= disTmp[j]) {
          money += (emoticons[j] * (100 - disTmp[j])) / 100;
        }
        if (users[i][1] <= money) {
          isSign = true;
          break;
        }
      }
      if (isSign) result[0]++;
      else result[1] += money;
    }

    return result;
  };

  const dfs = (node) => {
    if (emoLen === disTmp.length) {
      const [plusP, money] = cal();

      if (result[0] < plusP) {
        result = [plusP, money];
      } else if (result[0] == plusP && result[1] < money) {
        result = [plusP, money];
      }
      return;
    }
    if (node === emoLen) return;

    for (const d of discount) {
      disTmp.push(d);
      dfs(node + 1);
      disTmp.pop();
    }
  };
  dfs(0);
  return result;
}

console.log(
  solution(
    [
      [40, 10000],
      [25, 10000],
    ],
    [7000, 9000]
  )
);
