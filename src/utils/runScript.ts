import { exec } from "child_process";

export function runGetHtmlScript(): void {
  exec("npm run gethtml", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing gethtml script: ${error}`);
      return;
    }

    if (stderr) {
      console.error(`Error in gethtml script: ${stderr}`);
      return;
    }

    console.log(`gethtml script output: ${stdout}`);
  });
}
