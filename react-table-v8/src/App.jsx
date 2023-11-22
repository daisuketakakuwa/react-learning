import { useEffect, useState } from "react";
import { fetchData } from "./dataFetcher";
import Table from "./Table";

const App = () => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  const actionPaginationFetch = (pageNumber) => {
    const result = fetchData(pageNumber);
    setData(result.results);
    setTotalRecords(result.numberOfElements);
    setTotalPages(result.totalPages);
  };

  useEffect(() => {
    actionPaginationFetch(0);
  }, []);

  return (
    <>
      <h1>react table v8</h1>
      <p>総件数：{totalRecords}件</p>
      {data && <Table data={data} totalPages={totalPages} actionPaginationFetch={actionPaginationFetch} />}
    </>
  );
};

export default App;
