import { spawn } from 'child_process';
import os from 'os';


export async function executeCommand(module: string, command: string, flag: string): Promise<string> {
  return new Promise(function (resolve, reject) {
    let exec;
    if (os.platform() === "win32") {
      //windows execute code
      exec = spawn(`${process.cwd()}\\cli-modules\\${module}\\${module}`, [command, flag],);
    }
    else {
      //linux execute code 
      exec = spawn(`${process.cwd()}/cli-modules/${module}/${module}`, [command, flag],);
    }
    exec.stdout.on('data', (data) => {
      resolve(data.toString().replace(/[\n\r]/g, ""));
    });
    exec.on('error', function (err) {
      reject(err);
    });
  })
}

