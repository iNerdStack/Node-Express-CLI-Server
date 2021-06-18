import { executeCommand } from "../native/exec";

export class crypto_cli {
    async createHash(hashType: string, word: string | number): Promise<string>{
       return await executeCommand("crypto-cli", hashType, `--text=${word}`)
    }
}