const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');
const { Draw } = require('../common/js/draw.js');
const { constants, innitDirs } = require('../common/js/constants.js');
const { Utils } = require('../common/js/utils.js');
const { labels } = require('../web/js/sketchpadScript.js');

innitDirs();

const canvas = createCanvas(400, 400);
const ctx = canvas.getContext('2d');

const fileNames = fs.readdirSync(constants.RAW_DIR);

const samples = [];

let id = 1;

fileNames.forEach(fileName => {
  const content = fs.readFileSync(path.join(constants.RAW_DIR, fileName));

  const { session, name, drawings } = JSON.parse(content);

  for (let label in drawings) {
    samples.push({
      id,
      label,
      name,
      sessionId: session,
    });

    const paths = drawings[label];
    fs.writeFileSync(
        path.join(constants.JSON_DIR, `${id}.json`),
        JSON.stringify(paths),
    );

    generateImageFile(path.join(constants.IMG_DIR, `${id}.png`), paths);

    Utils.printProgress(id, fileNames.length * labels.length);

    id++;
  }
});

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));
fs.writeFileSync(constants.SAMPLES_JS, `const samples = ${JSON.stringify(samples)};`);


function generateImageFile(fileName, paths) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Draw.paths(ctx, paths);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(fileName, buffer);
}
