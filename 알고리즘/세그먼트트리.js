//1. 초기화
//2. 질의
//2-1. 질의 index => tree index로 변경 index + (2**k) -1
//2-2 start,end index를 tree index로 변경 후
// start % 2 ==1 해당 노드선택
// end % 2 ==0 해당 노드 선택
//3. 업데이트

let input = `5 2 2
1
2
3
4
5
1 3 6
2 2 5
1 5 2
2 3 5`.split("\n");

const [n, k, m] = input[0].split(" ").map(Number);
const e = Math.ceil(Math.log2(n));
let tree = Array.from({ length: n * 4 }, () => BigInt(0));
let arr = [0];

for (let i = 1; i <= n; i++) {
  const val = BigInt(input[i]);
  const index = 2 ** e + i - 1;
  arr.push(val);
  segment_update(index, val);
}

for (let j = n + 1; j <= n + k + m; j++) {
  let [a, b, c] = input[j].split(" ");
  if (a == "1") {
    b = Number(b);
    const val = BigInt(c) - arr[b];
    const index = 2 ** e + b - 1;
    segment_update(index, val);
  } else {
    console.log(segement_query(1, n, 1, Number(b), Number(c)).toString());
  }
}

function segment_update(i, val) {
  while (i >= 1) {
    tree[i] += val;
    i -= Math.ceil(i / 2);
  }
}

function segement_query(start, end, index, left, right) {
  if (start > right || end < left) return BigInt(0);
  if (start >= left && end <= right) return tree[index];

  const mid = Math.floor((start + end) / 2);
  tmp =
    segement_query(start, mid, index * 2, left, right) +
    segement_query(mid + 1, end, index * 2 + 1, left, right);
  return tmp;
}
