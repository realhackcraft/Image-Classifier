const constants = {};

constants.RAW_DIR = './raw';
constants.DATASET_DIR = './dataset';
constants.JSON_DIR = constants.DATASET_DIR + '/json';
constants.IMG_DIR = constants.DATASET_DIR + '/img';
constants.SAMPLES = constants.DATASET_DIR + '/samples.json';
constants.COMMON = '../common';
constants.JS_OBJECTS = constants.COMMON + '/js-objects';
constants.SAMPLES_JS = constants.JS_OBJECTS + '/samples.js';

if (typeof module !== 'undefined' && module.exports) {
  const { Utils } = require('./utils');

  function innitDirs() {
    const path = require('path');
    Utils.createDirIfNonexistent(path.resolve(constants.JSON_DIR));
    Utils.createDirIfNonexistent(path.resolve(constants.IMG_DIR));
  }

  module.exports = { constants, innitDirs };
}