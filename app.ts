import express from 'express';
import { crypto_cli } from "./cli-modules"

const app = express();
const jsonParser = express.json();
const PORT: string | number = process.env.PORT || 5000;

app.post("/hash", jsonParser, async (req, res) => {
  let hashedPassword: string = await new crypto_cli().createHash("md5", req.body.password);
  res.status(200).json({
    userName: req.body.userName,
    hashedPassword
  });
});


app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});