#!/usr/bin/env node

const spawn = require("cross-spawn");
const fs = require("fs");
const path = require("path");

const projectName = process.argv[2]; // get project name
const currentDir = process.cwd(); // get current dir

const projectDir = path.resolve(currentDir, projectName || "create-tse");
fs.mkdirSync(projectDir, { recursive: true });

const templateDir = path.resolve(__dirname, "src", "node-express");
fs.cpSync(templateDir, projectDir, { recursive: true });

// It is good practice to have dotfiles stored in the
// template without the dot (so they do not get picked
// up by the starter template repository). We can rename
// the dotfiles after we have copied them over to the
// new project directory.
// fs.renameSync(
//   path.join(projectDir, "gitignore"),
//   path.join(projectDir, ".gitignore")
// );

// const projectPackageJson = require(path.join(projectDir, "package.json"));

// // Update the project's package.json with the new project name
// projectPackageJson.name = projectName;

// fs.writeFileSync(
//   path.join(projectDir, "package.json"),
//   JSON.stringify(projectPackageJson, null, 2)
// );

// Run `npm install` in the project directory to install
// the dependencies. We are using a third-party library
// called `cross-spawn` for cross-platform support.
// (Node has issues spawning child processes in Windows).
process.chdir(projectDir);
spawn.sync("npm", ["install"], { stdio: "inherit" });

console.log("Node + Express Typescript Initialize Successfully");
