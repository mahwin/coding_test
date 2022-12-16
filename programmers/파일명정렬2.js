function solution(files) {
  let answer = [];

  const spliter = (file) => {
    let index = [];
    let numbers = Array.from({ length: 10 }, (_, i) => i).map(String);

    for (let i = 0; i < file.length; i++) {
      if (numbers.includes(file[i])) {
        index.push(i);
      } else {
        if (index.length !== 0) {
          break;
        }
      }
    }

    let [start, end] = [index[0], index[index.length - 1]];

    return [
      file.slice(0, start),
      file.slice(start, end + 1),
      file.slice(end + 1),
    ];
  };

  files.sort((file1, file2) => {
    [head1, number1, tail1] = spliter(file1);
    [head2, number2, tail2] = spliter(file2);
    head1 = head1.toLowerCase();
    head2 = head2.toLowerCase();
    number1 = Number(number1);
    number2 = Number(number2);

    if (head1 === head2) {
      return number1 - number2;
    } else {
      return head1.localeCompare(head2);
    }
  });
  return files;
}

solution([
  "F-5 Freedom Fighter",
  "B-50 Superfortress",
  "A-10 Thunderbolt II",
  "F-14 Tomcat",
]);
