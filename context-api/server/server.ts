import axios from "axios";
import express from "express";

const app = express();

app.get("/up", (req, res) => {
  res.send("OK");
});

// 仮でTokenとってくるようなMiddleware定義してみるか

app.get("/api/policies", async (req, res) => {
  const result = await axios.get("http://localhost:8888/policies");
  res.send(result.data);
});

app.listen(4000, () => {
  console.log("App is listening on port 4000!");
});
