function solution(order) {
  let subContainer = [];
  let mainContainer = Array.from({ length: order.length }, (_, idx) => idx + 1);
  let answer = 0;
  let fostTarget = 0;
  while (true) {
    const targetTackbae = order[answer];
    if (targetTackbae === undefined) return answer;
    const subIdx = subContainer.findIndex((tack) => tack === targetTackbae);
    if (subIdx > -1) {
      if (subIdx === subContainer.length - 1) {
        subContainer.pop();
        answer++;
      } else {
        return answer;
      }
    } else {
      subContainer = subContainer.concat(
        mainContainer.slice(fostTarget, targetTackbae)
      );
      fostTarget = targetTackbae;
    }
  }
}
