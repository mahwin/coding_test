let input = `6 4
5 3
4`.split("\n");

// 가로 w 세로 h

let [w, h] = input[0].split(" ").map(Number);
let [x, y] = input[1].split(" ").map(Number);
let times = Number(input[2]);

// let dir = [1,1]
// for (let time =1; time<=times; time++){

//     if(antX ===0 || antX ===w){
//         if(antY===0 || antY ===h) dir = dir.map(el=>-el)
//         else dir[0] *= -1;
//     } else if (antY===0 || antY===h) dir[1] *= -1;

//     antX += dir[0]
//     antY += dir[1]
// }

// console.log(antX,antY)

// x축만 따지면 개미 이동은  +1 or -1임
const totalX = x + times;
const totalY = y + times;
const remainX = totalX % (2 * w);
const remainY = totalY % (2 * h);
if (remainX <= w) x = remainX;
else x = 2 * w - remainX;

if (remainY <= h) y = remainY;
else y = 2 * h - remainY;

console.log([x, y].join(" "));
