const { constants } = require('../../common/js/constants.js');
const { Features } = require('../../common/js/features.js');
const { Utils } = require('../../common/js/utils.js');

const fs = require('fs');

const samples = JSON.parse(fs.readFileSync(constants.SAMPLES).toString());

for (const sample of samples) {
  const paths = JSON.parse(fs.readFileSync(`${constants.JSON_DIR}/${sample.id}.json`).toString());

  const functions = Features.inUse.map(feature => feature.function);
  sample.point = functions.map(func => func(paths));

  Utils.printProgress(sample.id, samples.length);
}

// const minMax = Utils.normalizePoints(samples.map(sample => sample.point));
const { means, stdDevs } = Utils.standardizePoints(samples.map(sample => sample.point));

const featureNames = Features.inUse.map(feature => feature.name);

fs.writeFileSync(constants.FEATURES, JSON.stringify({
  featureNames, samples: samples.map(sample => {
    return {
      point: sample.point, label: sample.label,
    };
  }),
}));

fs.writeFileSync(constants.FEATURES_JS, `const features = ${JSON.stringify({ featureNames, samples })};`);

// fs.writeFileSync(constants.MINMAX_JS, `const minMax = ${JSON.stringify(minMax)};`);
fs.writeFileSync(constants.MEAN_STDDEV, `const means = ${JSON.stringify(means)};
const stdDevs = ${JSON.stringify(stdDevs)};`);
