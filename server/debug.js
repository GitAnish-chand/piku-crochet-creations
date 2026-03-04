const fs = require('fs');
try {
    require('./index.js');
} catch (e) {
    fs.writeFileSync('crash.log', e.stack);
}
