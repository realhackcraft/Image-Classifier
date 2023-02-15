const fs = require('fs');

class Utils {
  static printProgress(counts, max) {
    const percentage = Math.round((counts / max) * 100);

    const percentageFraction = 2;

    const barLength = 20;
    const filledLength = Math.round(barLength * (percentage / 100));

    const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
    const text = `Progress: [${bar}] ${percentage.toFixed(percentageFraction)}%`;

    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    process.stdout.write(text);
  }

  static createDirIfNonexistent(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }
}

module.exports = { Utils };