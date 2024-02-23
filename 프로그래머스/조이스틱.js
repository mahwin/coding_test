function solution(name) {
  const nameArr = name.split("");
  let result = Infinity;

  const find = (arr, curIdx) => {
    const dirInfo = { i: curIdx, cnt: 0 };
    const aDirInfo = { i: curIdx, cnt: 0 };

    for (let i = 0; i < arr.length; i++) {
      dirInfo.i = dirInfo.i + 1 >= arr.length ? 0 : dirInfo.i + 1;
      if (arr[dirInfo.i] !== name[dirInfo.i]) {
        dirInfo.cnt = i + 1;
        break;
      }
    }

    for (let i = 0; i < arr.length; i++) {
      aDirInfo.i = aDirInfo.i - 1 < 0 ? arr.length - 1 : aDirInfo.i - 1;
      if (arr[aDirInfo.i] !== name[aDirInfo.i]) {
        aDirInfo.cnt = i + 1;
        break;
      }
    }
    return { dirInfo, aDirInfo };
  };

  const cal = (a1, a2) => {
    const d = Math.abs(a1.charCodeAt() - a2.charCodeAt());
    const aD = 26 - d;
    return Math.min(d, aD);
  };
  const dfs = (arr, i, cnt) => {
    cnt += cal(arr[i], name[i]);
    const copyArr = [...arr];
    copyArr[i] = name[i];

    const { aDirInfo, dirInfo } = find(arr, i);

    if (dirInfo.i === i) {
      result = Math.min(result, cnt);
      return;
    }

    dfs(copyArr, dirInfo.i, cnt + dirInfo.cnt);
    dfs(copyArr, aDirInfo.i, cnt + aDirInfo.cnt);
  };

  dfs("A".repeat(nameArr.length), 0, 0);
  return result;
}
