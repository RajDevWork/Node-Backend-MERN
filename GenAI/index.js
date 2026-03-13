import readline from 'readline/promises';
import { ChatGoogle } from "@langchain/google";
import dotenv from 'dotenv';
import {HumanMessage} from "langchain";
dotenv.config();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const model = new ChatGoogle("gemini-2.5-flash");
const messages = []
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
};

const userPrompt = `${colors.green}You:${colors.reset} `;

console.log(`Type '${colors.yellow}exit${colors.reset}' or press Ctrl+C to quit.\n`);

while (true) {
  const prompt = await rl.question(userPrompt);
  messages.push(new HumanMessage(prompt));

  if (!prompt || prompt.trim().toLowerCase() === 'exit') {
    console.log(`${colors.cyan}Goodbye!${colors.reset}`);
    break;
  }

  try {
    const ai = await model.invoke(messages);
    console.log(`\n${colors.blue}════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.cyan}AI:${colors.reset}`);
    console.log(`${colors.white ?? ''}${ai.content}${colors.reset}`);
    console.log(`${colors.blue}════════════════════════════════════════════════${colors.reset}\n`);
    messages.push(ai);
  } catch (err) {
    console.error(`${colors.red}Error talking to the model:${colors.reset}`, err);
  }
}

rl.close();
