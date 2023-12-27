let input = `3 4
main FolderA 1
main FolderB 1
FolderA File1 0
FolderA File2 0
FolderB FolderC 1
FolderB File1 0
FolderB File3 0
4
main
main/FolderA
main/FolderB
main/FolderB/FolderC`.split("\n");

const solution = () => {
  const fileMap = {};
  let cnt = 0;
  const [totalFolder, totalFile] = input[0].split(" ").map(Number);
  for (let i = 1; i <= totalFolder + totalFile; i++) {
    const [nameA, nameB, type] = input[i].split(" ");
    if (nameA in fileMap) {
      fileMap[nameA].push([nameB, type]);
    } else {
      fileMap[nameA] = [[nameB, type]];
    }
  }

  const search = (folder, fileSet) => {
    if (!fileMap[folder]) return;

    for (const [name, type] of fileMap[folder]) {
      if (type == 0) {
        cnt++;
        fileSet.add(name);
      } else {
        search(name, fileSet);
      }
    }
  };

  let result = ``;
  const queryIdx = totalFolder + totalFile + 1;
  const queryLen = +input[queryIdx];

  for (let i = queryIdx + 1; i <= queryIdx + queryLen; i++) {
    const leafFolder = input[i].split("/").at(-1).trim();
    const fileSet = new Set();
    cnt = 0;
    search(leafFolder, fileSet);
    result += [fileSet.size, cnt].join(" ") + "\n";
  }

  console.log(result.trim());
};

solution();
