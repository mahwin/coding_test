const timeToMin = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const splitMusic = (string) => {
  let music = [];
  for (let i = 0; i < string.length; i++) {
    if (string[i] == "#") {
      const pre = music.pop();
      music.push(pre + "#");
    } else {
      music.push(string[i]);
    }
  }

  return music;
};

function solution(m, musicinfos) {
  let possible = []; // 타이틀, 플레이 타임, 들어온 순서
  const target = splitMusic(m);
  musicinfos.forEach((el, radioIdx) => {
    const [start, end, title, musicString] = el.split(",");
    const playTime = timeToMin(end) - timeToMin(start);
    const music = splitMusic(musicString);
    const musicLen = music.length;

    let currentIdx = 0; // 네오가 찾던 음악 어느 마디까지 일치하는 지 저장.
    let musicIdx = 0; // 현재 시간 라디오에서 재생되는 음악

    for (let i = 0; i < playTime; i++) {
      if (target[currentIdx] === music[musicIdx]) {
        currentIdx++;
      } else if (target[0] === music[musicIdx]) {
        currentIdx = 1;
      } else {
        currentIdx = 0;
      }

      if (currentIdx === target.length) {
        possible.push([title, playTime, radioIdx]);
        break;
      }

      musicIdx = musicIdx + 1 >= musicLen ? 0 : musicIdx + 1;
    }
  });

  if (possible.length == 0) return "(None)";
  return possible.sort((a, b) => {
    if (b[1] == a[1]) return a[2] - b[2];
    else return b[1] - a[1];
  })[0][0];
}
