// Parts of this code are copied from https://npm.im/lolcatjs.

// Imports
const chalk = require('chalk');

/**
 * ANSI Escape regex (might be wrong, I tried using https://npm.im/ansi-regex but it wasn't working properly
 * (the string `99D` just appeared when I filtered escape sequences from neofetch, so PR's welcome LOL)
 * @type {RegExp}
 */
let myRegex = /\u001B\[[^m]*m|\u001B\[[^h]*h/g

/**
 * Chalk instance for 256-bit color (we need to do this because it'd detect that its running in a non-tty without
 * color support, but we want to send the colors to the client so the detection would set it to no colors)
 * @type {chalk.Chalk}
 */
let c = new chalk.Instance({level: 3})

/**
 * Rainbow function, from lolcatjs
 * @param {number} freq Frequency for lolcat
 * @param {number} i Line position for lolcat
 * @returns {[number, number, number]}
 */
const rainbow = (freq, i) => {
    const red   = Math.round(Math.sin(freq * i) * 127 + 128);
    const green = Math.round(Math.sin(freq * i + 2 * Math.PI / 3) * 127 + 128);
    const blue  = Math.round(Math.sin(freq * i + 4 * Math.PI / 3) * 127 + 128);
    return [red, green, blue]
};

/**
 * String generator function
 * @param {string} string Input string
 * @param {{seed?: number, spread?: number, freq?: number, html?: boolean}} options Options object
 * @returns {string} HTML or ANSI-escaped lolcat output
 */
const generateString = (string, options = {}) => {

  // Set defaults
  let seed = options.seed || Math.floor(Math.random() * 1000);
  let spread = options.spread || 8.0;
  let freq = options.freq || 0.3
  let html = options.html || false;

  // Output string
  let output = ""

  // Ansi code replacement array
  let ansiCodes = [];

  // If the output is HTML
  if (html) {
    // Strip all ANSI codes
    string = string.replace(myRegex, "")
  } else {
    // Or store all ANSI codes into the array
    // We need to do this, because it'd shred existing ANSI sequences, for example: ^[REDm would turn into
    // ^[BLUEm^^[BLUEm[^[BLUEmR^[BLUEmE^[BLUEmD^[BLUEmm because we wrap each char in ANSI sequences. We use
    // \uffff to replace ANSI sequences so that they're one character and dont get broken down when wrapping
    // them. We also replace \uffff with \ufffe to avoid adding ANSI sequences back where they dont belong.
    string = String(string)
        .replace(/\uffff/g, "\ufffe")
        .replace(myRegex, code => {ansiCodes.push(code); return "\uffff"});
  }

  // Split and loop over each line
  const lines = string.split('\n')
  lines.forEach((line) => {

    // Add one to the seed to shift lines
    seed += 1;

    // Loop through every character and store the index
    // I use [...line] instead of line.split("") because it
    // [destroys surrogate pairs](https://unicode.org/faq/utf_bom.html#utf16-2)
    // [MDN Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
    [...line].forEach((char, index) => {

      // If the character is a whitespace
      if (char.match(/\s/) !== null) {
        // Add the character to the output without modification
        output += char
      } else {
        // Or calculate the color
        let colors = rainbow(freq, seed + index / spread);
        // and add the color value to the character by either
        output += html ?
            // using a span with a style if it's HTML output
            `<span style="color: rgb(${colors.join(",")})">${char}</span>` :
            // or with our chalk instance if it's not HTML output
            c.rgb(...colors)(char)
      }
    })

    // Add a newline with either a line break or newline depending on the output at the end of each line
    output += html ? "<br>" : "\n"
  });

  // If the output isn't HTML
  if (!html) {
    // restore the original ANSI escape sequences
    output = output.replace(/\uffff/g, () => ansiCodes.shift() )
  }

  // Return the output and wrap it into a pre tag if it's HTML
  return html ? `<pre>${output}</pre>` : output;
};


// Export the function
module.exports = generateString;
