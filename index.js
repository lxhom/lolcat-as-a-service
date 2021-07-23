// Imports
const cp = require("child_process");
const fs = require("fs");
const express = require("express")
let lolcat = require("./lolcat.js")

// Initialize express instance
let app = express();

// noinspection JSUnusedLocalSymbols
/**
 * Execute a program and return the output (should only be used in case we NEED to execute a binary)
 * @param {string} input The input for the program, which gets written into a file to avoid escaping while still
 * being safe (no RCE if you don't execute the contents of the `cmd` param)
 * @param {function(string): string} cmd The command to be executed, with the argument being the path to a file with
 * the contents in input. For example: `path => "cat " + path + " | lolcat"` will lolcat `input`
 * @returns {Promise<string>} The output of the program
 */
let exec = async (input, cmd) => {

  // Generate a file path & write input into it
  let file = "/tmp/f" + Math.random();
  fs.writeFileSync(file, Buffer.from(input))

  // Exec child
  let child = await cp.exec(cmd(file));

  // Set output variable
  let out = "";

  // On stdout write to `out`
  child.stdout.on("data", text => out += text);

  // Await stdout closure
  await new Promise(r => child.stdout.on("close", r));

  // Delete the generated file
  fs.unlinkSync(file)

  // Add a newline to the output in case there is none
  if (!out.endsWith("\n") && !out.endsWith("\r")) out += "\n";

  // Return results
  return out;
}

// POST handler (i couldn't get body-parser to work so i just used this and this was just quicker and it works)
app.use((req, res, next) => {
  if (req.method === "POST") {
    req.body = "";
    req.on('data', data => req.body += data);
    req.on('end', () => next());
  } else {
    next();
  }
});

// Send lolcat on POST /
app.post("/", (req, res) => {
  res.send(lolcat(req.body, req.query));
})

// Send lolcat on POST /lolcat
app.post("/lolcat", (req, res) => {
  res.send(lolcat(req.body, req.query));
})

// Send lolcat on GET /lolcat
app.get("/lolcat", (req, res) => {
  if (Object.keys(req.query).length === 1) {
    res.send(lolcat(Object.keys(req.query)[0])) // Short syntax
  } else {
    res.send(lolcat(req.query.text, req.query)) // Normal syntax
  }
})

// Redirect on GET /
app.get("/", async (req, res) => {
  res.redirect("https://docs.laas.cf/")
})

// Export for Deta
module.exports = app;