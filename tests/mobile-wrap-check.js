const fs = require('fs');
const path = require('path');

const css = fs.readFileSync(path.join(__dirname, '..', 'style.css'), 'utf8');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const phoneMedia = css.match(/@media\s*\(max-width:\s*480px\)\s*\{[\s\S]*$/);
assert(phoneMedia, 'Missing phone media query.');

const phoneCss = phoneMedia[0];
const verseBlock = phoneCss.match(/\.verse-text\s*\{[^}]*\}/);
assert(verseBlock, 'Missing phone .verse-text styles.');

assert(
  !/word-break\s*:\s*keep-all\s*;/.test(verseBlock[0]),
  'Phone verse text must not use word-break: keep-all; it prevents natural Chinese wrapping on iOS Safari.'
);

assert(
  /(?:overflow-wrap|word-wrap)\s*:\s*(?:anywhere|break-word)\s*;/.test(verseBlock[0]),
  'Phone verse text needs an explicit overflow wrapping fallback.'
);

assert(
  /\.stage\s*\{[^}]*width\s*:\s*100%\s*;/.test(phoneCss),
  'Phone stage should occupy the viewport width so long verses can wrap inside it.'
);

console.log('Mobile wrapping CSS looks good.');
