function solution(m, musicinfos) {
  let answer = "";
  const minCalCulator = (start, end) => {
    const [endH, endM] = end.split(":").map(Number);
    const [startH, startM] = start.split(":").map(Number);

    return (endH - startH) * 60 + endM - startM;
  };

  const songSplit = (song) => {
    let songArr = [];
    for (let s of song) {
      if (s !== "#") songArr.push(s);
      else songArr[songArr.length - 1] = songArr[songArr.length - 1] + "#";
    }
    return songArr;
  };

  let possibleMusicInfo = [];

  musicinfos.forEach((musicInfo) => {
    let [start, end, name, song] = musicInfo.split(",");
    const playtime = minCalCulator(start, end);
    songArr = songSplit(song);
    let index = 0;
    let totalSong = [];
    while (playtime !== index) {
      totalSong.push(songArr[index % songArr.length]);
      index++;
    }

    mLength = songSplit(m).length;
    for (let i = 0; i <= totalSong.length - mLength; i++) {
      if (m === totalSong.slice(i, i + mLength).join("")) {
        possibleMusicInfo.push([name, playtime]);
        break;
      }
    }
  });

  if (possibleMusicInfo.length === 0) return "(None)";
  if (possibleMusicInfo.length === 1) return possibleMusicInfo[0][0];
  else {
    possibleMusicInfo.sort((a, b) => b[1] - a[1]);
    return possibleMusicInfo[0][0];
  }
}

console.log(
  solution("C#BCC#BCC#BCC#B", [
    "03:00,03:30,FOO,CC#B",
    "04:00,04:08,BAR,CC#BCC#BCC#B",
  ])
);
