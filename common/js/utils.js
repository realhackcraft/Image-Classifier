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

  static normalizePoints(points, minMax) {
    let max, min;
    const dimensions = points[0].length;

    if (!minMax) {
      min = [...points[0]];
      max = [...points[0]];
      for (const point of points) {
        for (let i = 0; i < dimensions; i++) {
          max[i] = Math.max(max[i], point[i]);
          min[i] = Math.min(min[i], point[i]);
        }
      }
    } else {
      min = minMax.min;
      max = minMax.max;
    }

    for (const i in points) {
      for (let j = 0; j < dimensions; j++) {
        points[i][j] = Utils.invLerp(min[j], max[j], points[i][j]);
      }
    }

    return { min, max };
  }

  static standardizePoints(points, _means, _stdDevs) {
    let means, stdDevs;

    const dimensions = points[0].length;

    if (_means && _stdDevs) {
      means = _means;
      stdDevs = _stdDevs;
    } else {
      means = [];
      stdDevs = [];

      for (let i = 0; i < dimensions; i++) {
        const values = points.map(p => p[i]);
        const mean = Utils.mean(values);
        const std = Utils.stdDev(values);

        means.push(mean);
        stdDevs.push(std);
      }

    }

    for (const i in points) {
      for (let j = 0; j < dimensions; j++) {
        points[i][j] = (points[i][j] - means[j]) / stdDevs[j];
      }
    }

    return { means, stdDevs };
  }

  static invLerp(min, max, point) {
    return (point - min) / (max - min);
  }

  static mean(values) {
    return values.reduce((a, b) => a + b) / values.length;
  }

  static stdDev(values) {
    //   calculate standard deviation
    const avg = Utils.mean(values);

    const squareDiffs = values.map((value) => {
      const diff = value - avg;
      return diff * diff;
    });

    const avgSquareDiff = Utils.mean(squareDiffs);

    return Math.sqrt(avgSquareDiff);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Utils };
}
