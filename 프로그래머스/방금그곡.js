const mapping = {
  "C#": "1",
  "D#": "2",
  "F#": "3",
  "G#": "4",
  "A#": "5",
  "B#": "6",
};

function solution(m, musicinfos) {
  const result = [];

  const originMusic = mappingMusic(m);

  musicinfos = musicinfos.map((el) => {
    const [start, end, title, music] = el.split(",");
    const min = hhmmToMin(end) - hhmmToMin(start);

    let matchCnt = 0;

    const radioMusic = mappingMusic(music);

    const padMusic = paddingMusic(radioMusic, min);
    if (padMusic.includes(originMusic)) {
      result.push({ title, min });
    }
  });

  if (result.length === 0) return "(None)";

  return result.sort((a, b) => b.min - a.min)[0].title;
}

function mappingMusic(music) {
  const splitArr = [];

  for (let i = 0; i < music.length; i++) {
    if (music[i] === "#") {
      splitArr[splitArr.length - 1] = splitArr[splitArr.length - 1] + music[i];
      continue;
    }
    splitArr.push(music[i]);
  }
  return splitArr.map((el) => mapping[el] || el).join("");
}

function paddingMusic(music, min) {
  let str = music;
  while (str.length < min) {
    str += music;
  }

  if (min <= 0) return "";
  return str.slice(0, min);
}

function hhmmToMin(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}
