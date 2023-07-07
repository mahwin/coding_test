let input = `1
000.000.000.000`.split("\n");
const ipToBit = (ip) => {
  let bit = "";
  ip.split(".").forEach(
    (num) => (bit += Number(num).toString(2).padStart(8, "0"))
  );
  return bit;
};

const find = (ips) => {
  for (let i = 0; i < 32; i++) {
    let tmp = ips[0][i];
    for (let j = 1; j < ips.length; j++) {
      if (ips[j][i] != tmp) return i;
    }
  }
  return 32;
};

const bitToIp = (bit) => {
  let arr = [];
  for (let i = 0; i < 32; i += 8) {
    arr.push(parseInt(bit.slice(i, i + 8), 2));
  }
  return arr.join(".");
};

const solution = () => {
  const n = Number(input[0]);

  const ips = [];
  for (let i = 1; i <= n; i++) {
    ips.push(ipToBit(input[i]));
  }

  let bitMaskThreshold = find(ips);

  let bitMask = "1".repeat(bitMaskThreshold).padEnd(32, "0");
  let minimalHost = ips[0].slice(0, bitMaskThreshold).padEnd(32, "0");

  console.log([bitToIp(minimalHost), bitToIp(bitMask)].join("\n"));
};

solution();
