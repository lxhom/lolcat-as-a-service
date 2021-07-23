let cp = require("child_process");
let fs = require("fs");

let app = require("express")();
// let info = require("marked")(require("fs").readFileSync("info.md").toString());

let exec = async (input, cmd) => {
  let file = "/tmp/f" + Math.random();
  fs.writeFileSync(file, Buffer.from(input))
  let child = await cp.exec(cmd(file));
  let out = "";
  child.stdout.on("data", text => out += text);
  await new Promise(r => child.stdout.on("close", r));
  fs.unlinkSync(file)
  if (!out.endsWith("\n") && !out.endsWith("\r")) out += "\n";
  return out;
}

app.use((req, res, next) => {
  if (req.method === "POST") {
    req.body = "";
    req.on('data', data => req.body += data);
    req.on('end', () => next());
  } else {
    next();
  }
});

/*
app.get("/", (req, res) => {
  res.send(info)
})
 */

let lolcat = require("./lolcat.js")

app.post("/", (req, res) => {
  res.send(lolcat(req.body));
})

app.post("/lolcat", (req, res) => {
  res.send(lolcat(req.body));
})

app.get("/lolcat", (req, res) => {
  if (Object.keys(req.query).length === 1) {
    res.send(lolcat(Object.keys(req.query)[0]))
  } else {
    res.send(lolcat(req.query.text, req.query))
  }
})

app.get("/", async (req, res) => {
  res.redirect("https://docs.laas.cf/")
})

module.exports = app;