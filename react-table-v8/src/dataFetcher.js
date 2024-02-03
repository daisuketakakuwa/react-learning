export const fetchData = (pageIndex, pageSize) => {

  // 1ページ目: pageNumber(0)✕pageSize(3) + 1 = 1
  // 2ページ目: pageNumber(1)✕pageSize(3) + 1 = 4
  // 3ページ目: pageNumber(2)✕pageSize(3) + 1 = 7
  const startIndex = pageIndex * pageSize + 1;
  // 28件
  const names = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
  return {
    pageIndex: startIndex,
    // 1ページに表示する件数
    pageSize,
    // 28件/X(3)件 = 10ページ(3*9ページ + 1*1ページ)
    totalPages: Math.ceil(names.length / pageSize),

    // データ総件数
    numberOfElements: names.length,

    results: [
      {
        id: startIndex,
        name: names[startIndex - 1],
        birthDate: `199901${`${startIndex}`.padStart(2, "0")}`,
      },
      {
        id: startIndex + 1,
        name: names[startIndex],
        birthDate: `199901${`${startIndex + 1}`.padStart(2, "0")}`,
      },
      {
        id: startIndex + 2,
        name: names[startIndex + 1],
        birthDate: `199901${`${startIndex + 2}`.padStart(2, "0")}`,
      },
    ],
  };
};
