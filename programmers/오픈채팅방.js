function solution(record) {
  const nickname = {};
  let result = [];

  record.forEach((el) => {
    const [action, id, nick] = el.split(" ");
    switch (action) {
      case "Enter":
        result.push([action, id]);
        nickname[id] = nick;
        break;
      case "Leave":
        result.push([action, id]);
        break;
      case "Change":
        nickname[id] = nick;
        break;
    }
  });

  return result.map((el) => {
    const [action, id] = el;
    if (action === "Enter") return `${nickname[id]}님이 들어왔습니다.`;
    else return `${nickname[id]}님이 나갔습니다.`;
  });
}
