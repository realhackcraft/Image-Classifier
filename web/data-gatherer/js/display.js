function createRow(container, name, samples) {
  const row = document.createElement('div');
  row.classList.add('row');
  container.appendChild(row);

  const rowLabel = document.createElement('div');
  rowLabel.innerHTML = name;
  rowLabel.classList.add('row-label');
  row.appendChild(rowLabel);

  // iterate over samples object
  for (let sample of samples) {
    const { id, label, sessionId } = sample;

    const sampleContainer = document.createElement('div');
    sampleContainer.classList.add('sampleContainer');
    sampleContainer.id = `sample-${id}`;

    const img = document.createElement('img');
    img.src = `${constants.IMG_DIR}/${id}.png`;
    img.classList.add('sample');
    img.setAttribute('draggable', 'false');

    if (Utils.flaggedUsers.includes(sessionId)) {
      img.classList.add('blur');
      sampleContainer.style.cursor = 'not-allowed';
    } else {
      sampleContainer.onclick = () => {
        handleClick(sample, false);
      };
      sampleContainer.oncontextmenu = (e) => {
        e.preventDefault();
        window.open(`${constants.IMG_DIR}/${id}.png`, '_blank');
      };
      sampleContainer.style.cursor = 'pointer';
    }

    const sampleLabel = document.createElement('div');
    sampleLabel.innerHTML = label;
    sampleLabel.classList.add('sampleLabel');
    sampleContainer.appendChild(sampleLabel);
    sampleContainer.appendChild(img);

    row.appendChild(sampleContainer);
  }
}

function handleClick(sample, scroll = true) {
  [...document.getElementsByClassName('emphasize')].forEach(element => element.classList.remove('emphasize'));

  if (sample === null) return;

  const element = document.getElementById(`sample-${sample.id}`);

  if (element.classList.contains('emphasize')) {
    element.classList.remove('emphasize');
    chart.selectSample(null);
    return;
  }

  element.classList.add('emphasize');
  if (scroll) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  chart.selectSample(sample);
}

function toggleInput() {
  if (document.getElementById('inputContainer').style.display === 'none') {
    document.getElementById('inputContainer').style.display = 'block';
    sketchpad.triggerUpdate();
  } else {
    document.getElementById('inputContainer').style.display = 'none';
    chart.hideDynamicPoint();
  }
}
