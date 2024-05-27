function solution(phone_book) {
  let phoneSet = new Set();

  phone_book.sort((a, b) => a.length - b.length);

  for (const phone of phone_book) {
    let subPhone = "";
    for (let i = 0; i < phone.length; i++) {
      subPhone += phone[i];
      if (phoneSet.has(subPhone)) return false;
    }
    phoneSet.add(subPhone);
  }

  return true;
}
