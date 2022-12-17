function solution(record) {
  let answer = [];
  let nickName = {};
  record.forEach((rec) => {
    const [action, id, name] = rec.split(" ");
    if (action === "Enter") {
      nickName[id] = name;
      answer.push({ id, action: "님이 들어왔습니다." });
    } else if (action === "Leave")
      answer.push({ id, action: "님이 나갔습니다." });
    else nickName[id] = name;
  });

  return answer.map(({ id, action }) => nickName[id] + action);
}

console.log(
  solution([
    "Enter uid1234 Muzi",
    "Enter uid4567 Prodo",
    "Leave uid1234",
    "Enter uid1234 Prodo",
    "Change uid4567 Ryan",
  ])
);
