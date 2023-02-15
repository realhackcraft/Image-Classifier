class Draw {
  static path(ctx, path, colour = 'black', width = 3) {
    ctx.beginPath();
    ctx.strokeStyle = colour;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.stroke();
  }

  static paths(ctx, paths, colour = 'black', width = 3) {
    for (const path of paths) {
      this.path(ctx, path, colour, width);
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Draw };
}
