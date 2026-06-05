#!/usr/bin/env node

import { spawn } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
};

const log = (message, color = "reset") => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

const runCommand = (cmd, args, cwd) =>
  new Promise((resolve, reject) => {
    log(`[run] ${cmd} ${args.join(" ")} (${cwd})`, "blue");

    const child = spawn(cmd, args, {
      cwd,
      shell: process.platform === "win32",
      stdio: "inherit",
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${cmd} ${args.join(" ")} failed with exit code ${code}`));
      }
    });

    child.on("error", reject);
  });

const checks = [
  {
    name: "backend",
    cwd: path.join(rootDir, "backend"),
    commands: [
      ["npm", ["install"]],
      ["node", ["--check", "server.js"]],
      ["npm", ["test"]],
      ["npm", ["run", "audit:prod"]],
    ],
  },
  {
    name: "frontend",
    cwd: path.join(rootDir, "frontend"),
    commands: [
      ["npm", ["install"]],
      ["npm", ["run", "lint"]],
      ["npm", ["run", "build"]],
      ["npm", ["run", "audit:prod"]],
    ],
  },
  {
    name: "admin",
    cwd: path.join(rootDir, "admin"),
    commands: [
      ["npm", ["install"]],
      ["npm", ["run", "lint"]],
      ["npm", ["run", "build"]],
      ["npm", ["run", "audit:prod"]],
    ],
  },
];

const results = [];

for (const check of checks) {
  log(`\nChecking ${check.name}`, "yellow");

  try {
    for (const [cmd, args] of check.commands) {
      await runCommand(cmd, args, check.cwd);
    }
    results.push([check.name, true]);
  } catch (error) {
    log(error.message, "red");
    results.push([check.name, false]);
  }
}

log("\nSummary", "yellow");

for (const [name, passed] of results) {
  log(`${name}: ${passed ? "PASS" : "FAIL"}`, passed ? "green" : "red");
}

if (results.some(([, passed]) => !passed)) {
  process.exit(1);
}

log("All checks passed.", "green");
