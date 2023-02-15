const sketchpad = new Sketchpad(document.getElementById('sketchpadContainer'));

let index = 0;
const labels = ['bicycle', 'fish', 'house', 'money', 'tree', 'key', 'watch'];

const data = {
  name: null,
  session: new Date().getTime(),
  drawings: {},
};

function start() {
  const name = document.getElementById('name');
  const advance = document.getElementById('advance');
  document.getElementById('name-label').classList.add('invisible');

  if (name.value === '') {
    alert('Please enter your name');
    return;
  }

  data.name = name.value;
  name.classList.add('invisible');
  advance.innerText = 'Next';
  advance.onclick = next;
  document.getElementById('sketchpadContainer').classList.remove('invisible');

  updateInstructions();
}

function next() {
  index++;

  if (sketchpad.paths.length === 0) {
    alert('Please draw something');
    return;
  }

  if (index >= labels.length) {
    finish();
    return;
  }

  const label = labels[index - 1];
  data.drawings[label] = sketchpad.paths;

  sketchpad.clear();

  updateInstructions();
}

function updateInstructions() {
  const label = labels[index];
  document.getElementById('instructions').innerText = `Please draw a ${label}`;
}

function finish() {
  document.getElementById('instructions').innerText = 'Thank you for your participation!';
  document.getElementById('advance').innerText = 'Save';
  document.getElementById('advance').onclick = save;

  document.getElementById('sketchpadContainer').classList.add('invisible');
}

function save() {
  document.getElementById('advance').classList.add('invisible');
  document.getElementById('instructions').innerText = 'Send the downloaded file to the hackcraft_@hotmail.com';

  const download = document.createElement('a');
  download.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;

  download.download = `${data.name}_${data.session}.json`;

  download.click();
  document.removeChild(download);
}