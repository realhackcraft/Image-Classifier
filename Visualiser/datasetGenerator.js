const fs = require('fs');
const path = require('path');

const constants = {};

constants.RAW_DIR = './raw';
constants.DATASET_DIR = './dataset';
constants.JSON_DIR = constants.DATASET_DIR + '/json';
constants.IMG_DIR = constants.DATASET_DIR + '/img';
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
    id++;
  }
});

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));
console.log(JSON.stringify(samples));