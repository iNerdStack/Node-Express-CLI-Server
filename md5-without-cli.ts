import express from 'express';
import crypto  from 'crypto';
const app = express();
const jsonParser = express.json();
const PORT = 4000;

app.post("/hash", jsonParser, (req, res, next) => {

    res.status(200).json({
        userName: req.body.userName,
        hashedPassword:  crypto.createHash('md5').update(req.body.password).digest('hex')
    });
});


app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});