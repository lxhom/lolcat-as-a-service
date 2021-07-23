"use strict";
const chalk = require('chalk');

const pattern = [
  '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
  '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
].join('|');

let ansiRegex = new RegExp(pattern, 'g');

let c = new chalk.Instance({level: 3})

const rainbow = (freq, i) => {
    const red   = Math.round(Math.sin(freq * i) * 127 + 128);
    const green = Math.round(Math.sin(freq * i + 2 * Math.PI / 3) * 127 + 128);
    const blue  = Math.round(Math.sin(freq * i + 4 * Math.PI / 3) * 127 + 128);
    return [red, green, blue]
};

const generateString = (string, options = {}) => {
  let seed = options.seed || Math.floor(Math.random() * 1000);
  let spread = options.spread || 8.0;
  let freq = options.freq || 0.3
  let html = options.html || false;

  let output = ""
  let ansiCodes = [];
  string = String(string).replace(/\uffff/g, "\ufffe").replace(ansiRegex, code => {ansiCodes.push(code); return "\uffff"});
  const lines = string.split('\n')
  lines.forEach((line) => {
    seed += 1;
    line.split("").forEach((char, index) => {
      if (char.match(/\S/) !== null) {
        let colors = rainbow(freq, seed + index / spread);
        output += html ?
            `<span style="color: rgb(${colors.join(",")})">${char}</span>` :
            c.rgb(...colors)(char)
      } else {
        output += char
      }
    })
    output += html ? "<br>" : "\n"
  });
  output.replace(/\uffff/g, ansiCodes.shift)
  return html ? `<pre>${output}</pre>` : output;
};

module.exports = generateString;

