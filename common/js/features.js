class Features {
  static inUse = [
    { name: 'Width', function: this.getWidth },
    { name: 'Height', function: this.getHeight },
    // { name: 'Path Count', functionName: this.getPathCount },
    // { name: 'Point Count', functionName: this.getPointCount },
  ];

  constructor() {
  }

  static getPathCount(paths) {
    return paths.length;
  }

  static getPointCount(paths) {
    const points = paths.flat();
    return points.length;
  }

  static getWidth(paths) {
    const points = paths.flat();
    const x = points.map(p => p.x);
    const min = Math.min(...x);
    const max = Math.max(...x);
    return max - min;
  }

  static getHeight(paths) {
    const points = paths.flat();
    const y = points.map(p => p.y);
    const min = Math.min(...y);
    const max = Math.max(...y);
    return max - min;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Features };
}
