class Utils {
  static flaggedUsers = [];

  static printProgress(counts, max) {
    const percentage = Math.round((counts / max) * 100);

    const percentageFraction = 2;

    const barLength = 20;
    const filledLength = Math.round(barLength * (percentage / 100));

    const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
    const text = `Progress: [${bar}] ${percentage.toFixed(percentageFraction)}%`;

    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);

    process.stdout.write(text);
  }

  static createDirIfNonexistent(dir) {
    const fs = require('fs');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }

  static groupBy(array, key) {
    const groups = {};
    array.forEach((item) => {
      const value = item[key];
      if (!groups[value]) {
        groups[value] = [];
      }
      groups[value].push(item);
    });
    return groups;
  }

  static toNameCase(string) {
    return string.split(' ').map(word => {
      if (word.toLowerCase().startsWith('mc')) {
        return word[0].toLowerCase() + word[1].toLowerCase() + word[2].toUpperCase() + word.slice(3).toLowerCase();
      }
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Utils };
}
