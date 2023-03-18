class Utils {
  static flaggedUsers = [1676582847179];
  static styles = {
    'bicycle': { color: 'cyan', text: '🚲' },
    'fish': { color: 'orange', text: '🐟' },
    'house': { color: 'red', text: '🏠' },
    'tree': { color: 'green', text: '🌲' },
    'flower': { color: 'blue', text: '🌻' },
    'sun': { color: 'yellow', text: '☀️' },
    'slice of pizza': { color: 'purple', text: '🍕' },
    'donut': { color: 'magenta', text: '🍩' },
  };

  static printProgress(counts, max) {
    const percentage = Math.round((counts / max) * 100);

    const percentageFraction = 2;

    const barLength = 20;
    const filledLength = Math.round(barLength * (percentage / 100));

    const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
    const text = `Progress: [${bar}] ${percentage.toFixed(percentageFraction)}% (${counts} / ${max})`;

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

  static distance(p1, p2) {
    return Math.sqrt(
        (p1[0] - p2[0]) ** 2 +
        (p1[1] - p2[1]) ** 2,
    );
  }

  static getNearest(loc, points, k = 1) {
    const object = points.map((point, index) => {
      return {
        point,
        index,
      };
    });

    const sorted = object.sort((a, b) => {
      return Utils.distance(loc, a.point) - Utils.distance(loc, b.point);
    });

    const indices = sorted.map(obj => obj.index);
    return indices.slice(0, k);
  }

  static normalizePoints(points) {
    const max = [...points[0]];
    const min = [...points[0]];
    const dimensions = points[0].length;

    for (const point of points) {
      for (let i = 0; i < dimensions; i++) {
        max[i] = Math.max(max[i], point[i]);
        min[i] = Math.min(min[i], point[i]);
      }
    }

    for (const i in points) {
      for (let j = 0; j < dimensions; j++) {
        points[i][j] = Utils.invLerp(min[j], max[j], points[i][j]);
      }
    }
  }

  static invLerp(min, max, point) {
    return (point - min) / (max - min);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Utils };
}
