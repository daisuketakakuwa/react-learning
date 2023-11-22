export const fetchData = (pageNumber) => {
  // 固定値
  const pageSize = 3;

  const index = pageNumber * pageSize + 1;
  // 28件
  const names = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
  return {
    pageIndex: pageNumber,
    // 1ページに表示する件数
    pageSize,
    // 28件/3件 = 10ページ(3*9ページ + 1*1ページ)
    totalPages: Math.ceil(names.length / pageSize),

    // データ総件数
    numberOfElements: names.length,
    results: [
      {
        id: index,
        name: names[index - 1],
        birthDate: `199901${`${index}`.padStart(2, "0")}`,
      },
      {
        id: index + 1,
        name: names[index],
        birthDate: `199901${`${index + 1}`.padStart(2, "0")}`,
      },
      {
        id: index + 2,
        name: names[index + 1],
        birthDate: `199901${`${index + 2}`.padStart(2, "0")}`,
      },
    ],
  };
};
