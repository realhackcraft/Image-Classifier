const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');
const { Draw } = require('../Data Gatherer/js/draw.js');

const canvas = createCanvas(400, 400);
const ctx = canvas.getContext('2d');

const constants = {};

constants.RAW_DIR = './Visualiser/raw';
constants.DATASET_DIR = './Visualiser/dataset';
createDirIfNonexistent(constants.DATASET_DIR);
constants.JSON_DIR = constants.DATASET_DIR + '/json';
createDirIfNonexistent(constants.JSON_DIR);
constants.IMG_DIR = constants.DATASET_DIR + '/img';
createDirIfNonexistent(constants.IMG_DIR);
constants.SAMPLES = constants.DATASET_DIR + '/samples.json';

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

    id++;
  }
});

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));

function generateImageFile(fileName, paths) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Draw.paths(ctx, paths);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(fileName, buffer);
}


function createDirIfNonexistent(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}