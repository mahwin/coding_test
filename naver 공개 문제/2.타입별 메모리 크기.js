const MAX_BYTE = 128;

const typeMEMORY = {
  BOOL: 1,
  SHORT: 2,
  FLOAT: 4,
  INT: 8,
  LONG: 16,
};

const padding8 = (tmp) => {
  return tmp.padEnd(8, ".");
};

function solution(param0) {
  let result = [];
  const len = param0.length;
  let tmp = "";
  for (let i = 0; i < len; i++) {
    const type = param0[i];

    switch (type) {
      case "LONG":
        if (tmp.length > 0) {
          result.push(padding8(tmp));
          tmp = "";
        }
        result.push("########");
        result.push("########");
        break;
      case "INT":
        if (tmp.length > 0) {
          result.push(padding8(tmp));
          tmp = "";
        }
        result.push("########");
        break;
      case "FLOAT":
        if (tmp.length > 4) {
          result.push(padding8(tmp));
          tmp = "####";
        } else if (tmp.length > 0) {
          tmp = tmp.padEnd(4, ".") + "####";
        } else {
          tmp = "####";
        }
        break;
      case "SHORT":
        if (tmp.length > 6) {
          result.push(padding8(tmp));
          tmp = "##";
        } else if (tmp.length === 6) {
          result.push(tmp + "##");
          tmp = "";
        } else if (tmp.length % 2 === 0) {
          tmp += "##";
        } else {
          tmp += ".##";
        }
        break;
      case "BOOL":
        if (tmp.length === 8) {
          result.push(tmp);
          tmp = "";
        } else if (tmp.length == 7) {
          result.push(tmp + "#");
          tmp = "";
        } else tmp += "#";

        break;
    }
  }
  if (tmp.length > 0) result.push(padding8(tmp));

  return result.length > MAX_BYTE / 8 ? "HALT" : result;
}

const inputs = [
  ["INT", "INT", "BOOL", "SHORT", "LONG"],
  ["INT", "SHORT", "FLOAT", "INT", "BOOL"],
  ["FLOAT", "SHORT", "BOOL", "BOOL", "BOOL", "INT"],
  [
    "BOOL",
    "LONG",
    "SHORT",
    "LONG",
    "BOOL",
    "LONG",
    "BOOL",
    "LONG",
    "SHORT",
    "LONG",
    "LONG",
  ],
];

const results = [
  ["########", "########", "#.##....", "########", "########"],
  ["########", "##..####", "########", "#......."],
  ["########", "#.......", "########"],
  "HALT",
];

for (let i = 0; i < 4; i++) {
  const answer = solution(inputs[i]);

  for (let j = 0; j < answer.length; j++) {
    console.log("내 답: ", answer[j]);
    console.log("정 답: ", results[i][j]);
    console.log(answer[j] == results[i][j] ? "O" : "X");
  }
  console.log("정답");
}
