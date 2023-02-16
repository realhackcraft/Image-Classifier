const groups = Utils.groupBy(samples, 'sessionId');

for (let sessionID in groups) {
  const samples = groups[sessionID];
  const name = samples[0].name;
  createRow(document.getElementById('container'), name, samples);
}