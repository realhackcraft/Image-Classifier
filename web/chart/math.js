const math = {};

math.equals = (p1, p2) => {
    return p1[0] === p2[0] && p1[1] === p2[1];
};

math.lerp = (a, b, t) => {
    return a + (b - a) * t;
};

math.invLerp = (a, b, v) => {
    return (v - a) / (b - a);
};

math.remap = (oldA, oldB, newA, newB, v) => {
    return math.lerp(newA, newB, math.invLerp(oldA, oldB, v));
};

math.remapPoint = (oldBounds, newBounds, point) => {
    return [
        math.remap(oldBounds.left, oldBounds.right,
            newBounds.left, newBounds.right, point[0]),
        math.remap(oldBounds.top, oldBounds.bottom,
            newBounds.top, newBounds.bottom, point[1]),
    ];
};

math.add = (p1, p2) => {
    return [
        p1[0] + p2[0],
        p1[1] + p2[1],
    ];
};

math.subtract = (p1, p2) => {
    return [
        p1[0] - p2[0],
        p1[1] - p2[1],
    ];
};

math.scale = (p, scaler) => {
    return [
        p[0] * scaler,
        p[1] * scaler,
    ];
};

math.formatNumber = (n, dec = 0) => {
    return n.toFixed(dec);
};