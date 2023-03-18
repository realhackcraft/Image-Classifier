const { constants } = require('../../common/js/constants.js');
const { Features } = require('../../common/js/features.js');
const { Utils } = require('../../common/js/utils.js');

const fs = require('fs');

const samples = JSON.parse(fs.readFileSync(constants.SAMPLES));

for (const sample of samples) {
  const paths = JSON.parse(fs.readFileSync(`${constants.JSON_DIR}/${sample.id}.json`));

  const functions = Features.inUse.map(feature => feature.function);
  sample.point = functions.map(func => func(paths));

  Utils.printProgress(sample.id, samples.length);
}

Utils.normalizePoints(samples.map(sample => sample.point));

const featureNames = Features.inUse.map(feature => feature.name);

fs.writeFileSync(constants.FEATURES, JSON.stringify({
  featureNames, samples: samples.map(sample => {
    return {
      point: sample.point, label: sample.label,
    };
  }),
}));

fs.writeFileSync(constants.FEATURES_JS, `const features = ${JSON.stringify({ featureNames, samples })};`);
