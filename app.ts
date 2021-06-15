import express from 'express';
import { spawn } from 'child_process';
const app = express();
const jsonParser = express.json();
const PORT = 4000;

//crypto-CLI hashTypes
enum hashTypes  { sha1= "sha1", sha512 = "sha512",md4 =  "md4",md5 =  "md5" }

let hashedPassword: string = "";

app.post("/hash", jsonParser, (req, res, next) => {
    //execute CLI Dependency in cli-dependencies folder
    const exec = spawn(`${__dirname}\\cli-dependencies\\crypto-cli`, [hashTypes.md5 , `--text=${req.body.password}`], );

    exec.stdout.on('data', (data) => {
        hashedPassword = data.toString().replace(/[\n\r]/g, "");
    });
    
    exec.stderr.on('data', (data) => {
       // console.error(`stderr: ${data}`);
      //if terminal error return  error directly from terminal
      res.status(500).json(data);
    });
    
    exec.on('close', (code) => {
    // console.log(`child process exited with code ${code}`);
    //exit code can be used as status code for cli operations
    res.status(200).json({
        userName: req.body.userName,
        hashedPassword
    });
    });

});


app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});