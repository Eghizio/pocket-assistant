import express from "express";
import morgan from "morgan";
import colors from "colors";
import { api } from "./api";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api", api);
app.use("/", express.static("src/client"));

const PORT = process.env.PORT || "8080";
app.listen(PORT, () => {
  console.log(colors.green(`\n${new Date()}\nServer started at ${PORT}...`));
});
