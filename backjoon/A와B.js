let input = `B
ABBA`.split("\n");

let [s, t] = input;
s = s.split("");
t = t.split("");
let result = 0;
while (s.length !== t.length) {
  const tmp = t.pop();
  if (tmp === "A") continue;
  else t = t.reverse();
}

if (s.join("") === t.join("")) console.log(1);
else console.log(0);
