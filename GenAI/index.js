import readline from "readline/promises";
import { ChatGoogle } from "@langchain/google";
import { HumanMessage, tool, createAgent } from "langchain";
import dotenv from "dotenv";
import {sendEmail} from "./mail.service.js";
dotenv.config();

import { tavilySearch } from "./tavilySearch.service.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatGoogle("gemini-2.5-flash");

const searchTool = tool(tavilySearch, {
  name: "tavily_search",
  description: "Search the web for information",
});
const emailTool = tool(sendEmail, {
  name: "send_email",
  description: "Send an email using the Gmail API. Provide 'to', 'subject', 'html', and 'text' parameters.",
});

const agent = createAgent({
  model,
  tools: [searchTool, emailTool],
});

const messages = [];

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  white: "\x1b[37m",
};

const line = `${colors.blue}══════════════════════════════════════════════════${colors.reset}`;

console.log(`${colors.yellow}🤖 AI CLI Assistant Started${colors.reset}`);
console.log(`Type '${colors.yellow}exit${colors.reset}' to quit\n`);

while (true) {
  const prompt = await rl.question(`${colors.green}You:${colors.reset} `);

  if (!prompt || prompt.trim().toLowerCase() === "exit") {
    console.log(`${colors.cyan}Goodbye! 👋${colors.reset}`);
    break;
  }

  messages.push(new HumanMessage(prompt));

  try {
    const response = await agent.invoke({
      messages,
    });

    const aiMessage = response.messages[response.messages.length - 1];

    messages.push(aiMessage);

    console.log(`\n${line}`);
    console.log(`${colors.cyan}🤖 AI:${colors.reset}\n`);
    console.log(`${colors.white}${aiMessage.content}${colors.reset}`);
    console.log(`${line}\n`);
  } catch (err) {
    console.error(`${colors.red}Error talking to the model:${colors.reset}`, err);
  }
}

rl.close();