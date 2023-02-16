function createRow(container, name, samples) {
  const row = document.createElement('div');
  row.classList.add('row');
  container.appendChild(row);

  const rowLabel = document.createElement('div');
  rowLabel.innerHTML = name;
  rowLabel.classList.add('row-label');
  row.appendChild(rowLabel);

  // iterate over samples object
  for (let i = 0; i < samples.length; i++) {
    const sample = samples[i];
    const { id, label, session_id } = sample;

    const img = document.createElement('img');
    img.src = `${constants.IMG_DIR}/${id}.png`;
    img.classList.add('sample');

    if (Utils.flaggedUsers.includes(session_id)) {
      img.classList.add('blur');
    }

    const sampleContainer = document.createElement('div');
    sampleContainer.classList.add('sampleContainer');

    const sampleLabel = document.createElement('div');
    sampleLabel.innerHTML = label;
    sampleLabel.classList.add('sampleLabel');
    sampleContainer.appendChild(sampleLabel);
    sampleContainer.appendChild(img);

    row.appendChild(sampleContainer);
  }
}