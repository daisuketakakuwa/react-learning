import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { PaginationButton, TdStyled, ThStyled, TrStyled } from "./App.styled";

// カラム定義(固定)
const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("id", {
    header: () => "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: () => "名前",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("birthDate", {
    header: () => "生年月日",
    cell: (info) => info.getValue(),
  }),
];

const Table = (props) => {
  const { data, totalPages, actionPaginationFetch } = props;

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3,
  });
  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const [paginationNumbers, setPaginationNumbers] = useState([]);

  // pageIndex が変わるたびに API(fetchData)を呼び出してあげる。
  useEffect(() => {
    actionPaginationFetch(pageIndex);
  }, [pageIndex]);

  // APIがコールされるたびに、Paginationの開始番号/終了番号を計算する
  useEffect(() => {
    let firstPageIndex;
    let lastPageIndex;
    // 開始番号
    switch (true) {
      case totalPages <= 5:
        firstPageIndex = 0;
        break;
      // ラスト 3番号のとき
      case totalPages - pageIndex + 1 < 4:
        firstPageIndex = totalPages - 5;
        break;
      // 中間
      case pageIndex - 2 >= 1:
        firstPageIndex = pageIndex - 2;
        break;
      default:
        firstPageIndex = 0;
        break;
    }

    // 終了番号
    switch (true) {
      case pageIndex <= 2:
        lastPageIndex = 4;
        break;
      case totalPages - pageIndex - 1 <= 2:
        lastPageIndex = totalPages - 1;
        break;
      default:
        lastPageIndex = pageIndex + 2;
        break;
    }

    let newPaginationNumbers = [];
    for (let i = firstPageIndex; i <= lastPageIndex; i++) {
      newPaginationNumbers.push(i + 1);
    }
    setPaginationNumbers(newPaginationNumbers);
  }, [pageIndex, totalPages]);

  const table = useReactTable({
    data,
    columns,
    pageCount: totalPages,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <>
      <table style={{ borderCollapse: "collapse", marginBottom: "10px" }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TrStyled key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <ThStyled key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</ThStyled>
              ))}
            </TrStyled>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <TrStyled key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TdStyled key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TdStyled>
              ))}
            </TrStyled>
          ))}
        </tbody>
      </table>

      <div style={{ display: "flex" }}>
        <PaginationButton $highlighted={+false} disabled={pageIndex === 0} onClick={() => table.setPageIndex(pageIndex - 1)}>前へ</PaginationButton>
        {paginationNumbers.map((i) => (
          <React.Fragment key={i}>
            <PaginationButton $highlighted={+(pageIndex + 1 === i)} onClick={() => table.setPageIndex(i - 1)}>{i}</PaginationButton>
          </React.Fragment>
        ))}
        <PaginationButton $highlighted={+false} disabled={pageIndex + 1 === totalPages} onClick={() => table.setPageIndex(pageIndex + 1)}>次へ</PaginationButton>
      </div>
    </>
  );
};

export default Table;
