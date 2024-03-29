const constants = {};

function setConstants(common) {
  constants.COMMON = common;
  constants.RAW_DIR = constants.COMMON + '/raw';
  constants.DATASET_DIR = constants.COMMON + '/dataset';
  constants.JSON_DIR = constants.DATASET_DIR + '/json';
  constants.IMG_DIR = constants.DATASET_DIR + '/img';
  constants.SAMPLES = constants.DATASET_DIR + '/samples.json';
  constants.FEATURES = constants.DATASET_DIR + '/features.json';

  constants.JS_OBJECTS = constants.COMMON + '/js-objects';
  constants.SAMPLES_JS = constants.JS_OBJECTS + '/samples.js';
  constants.FEATURES_JS = constants.JS_OBJECTS + '/features.js';
  constants.MINMAX_JS = constants.JS_OBJECTS + '/min-max.js';
  constants.MEAN_STDDEV = constants.JS_OBJECTS + '/means-std-dev.js';
}

if (typeof module !== 'undefined' && module.exports) {
  const { Utils } = require('./utils');

  function innitDirs() {
    const path = require('path');
    Utils.createDirIfNonexistent(path.resolve(constants.JSON_DIR));
    Utils.createDirIfNonexistent(path.resolve(constants.IMG_DIR));
  }

  setConstants('/Users/Hackcraft_/WebstormProjects/Image Classifier/common');
  module.exports = { constants, innitDirs };
} else {
  setConstants('../../common');
}