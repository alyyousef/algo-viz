const fs = require('fs');
let c = fs.readFileSync('scripts/deep-dives/generate-batch-017.mjs', 'utf8');
c = c.split('\\`').join('`');
fs.writeFileSync('scripts/deep-dives/generate-batch-017.mjs', c);
