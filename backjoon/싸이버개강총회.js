// 개강 총회 시작 전에 채팅을 남긴 사람은 개강총회에 참여 했다고 봄
// 개강 총회가 끝나자 마자 채팅 or 스트리밍이 끝나자 마자 채팅 = 끝까지 남아있었다고 생각함

let input = `06:00 12:00 18:00
06:00 shinyo17
06:00 kimchist
06:00 swoon
06:00 kheee512
06:00 Green55
09:00 kimchist
11:59 shinyo17
12:00 kimchist
17:59 swoon
17:59 swoon
18:00 kheee512
18:01 swoon
18:01 Green55
18:01 kheee512
18:01 swoon
18:21 jinius36
18:40 jeongyun1206`.split("\n");

const time2Min = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const solution = () => {
  let result = 0;

  const [s, e, q] = input[0].split(" ").map(time2Min);
  let names = new Set();
  let len = input.length;

  for (let i = 1; i < len; i++) {
    const [time, name] = input[i].split(" ");
    const min = time2Min(time);
    if (min <= s) names.add(name);
    else if (e <= min && min <= q && names.has(name)) {
      names.delete(name);
      result++;
    }
  }
  return result;
};

console.log(solution());
