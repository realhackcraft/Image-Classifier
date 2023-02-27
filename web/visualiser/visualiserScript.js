const { samples, featureNames } = features;
const SampleGroups = Utils.groupBy(samples, 'sessionId');

const usableSamples = samples.filter(sample => !Utils.flaggedUsers.includes(sample.sessionId));

for (let sessionId in SampleGroups) {
  const samples = SampleGroups[sessionId];
  const name = samples[0].name;
  createRow(document.getElementById('container'), name, samples);
}

const options = {
  size: 450,
  axesLabels: featureNames,
  legend: { position: 'none' },
  styles: Utils.styles,
  transparency: 0.7,
  icon: 'image',
};

graphics.generateImages(Utils.styles);

const chart = new Chart(
    document.getElementById('chartContainer'),
    usableSamples,
    options,
    handleClick);

const sketchpad = new Sketchpad(document.getElementById('inputContainer'), onDrawingUpdate, 400);

sketchpad.canvas.style.cssText += 'outline: 100000px solid rgba(0, 0, 0, 0.5)';

function onDrawingUpdate(paths) {
  const functions = Features.inUse.map(feature => feature.function);
  const point = functions.map(func => func(paths));
  
  const { label, nearestSample } = classify(point);
  document.getElementById('predictedLabelContainer').innerHTML = `Is it a ${label}?`;
  chart.showDynamicPoint(point, label, nearestSample);
}

function classify(point) {
  const samplePoints = samples.map(sample => sample.point);
  const index = Utils.getNearest(point, samplePoints);
  const nearestSample = samples[index];
  return { label: nearestSample.label, nearestSample };
}
