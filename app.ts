import express from "express";
import tokenRoutes from "./routes/tokenroutes";

const app = express();

app.use(express.json());

app.use("/api", tokenRoutes);

app.get("/", (_req, res) => {
  res.send("OPD Token Allocation Engine is running");
});

export default app;
