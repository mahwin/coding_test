const ENTER = "Enter";
const LEAVE = "Leave";
const CHANGE = "Change";

function solution(record) {
  const result = [];

  const uidObj = {};

  record.forEach((infoString) => {
    const [action, uid, ...remain] = infoString.split(" ");
    if (action === ENTER) {
      uidObj[uid] = remain[0];
      result.push({ action, uid });
    }
    if (action === CHANGE) {
      uidObj[uid] = remain[0];
    }
    if (action === LEAVE) {
      result.push({ action, uid });
    }
  });

  return result.map(({ action, uid }) => {
    return `${uidObj[uid]}님이 ${
      action === ENTER ? "들어왔습니다." : "나갔습니다."
    }`;
  });
}
