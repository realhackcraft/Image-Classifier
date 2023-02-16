const labels = ['bicycle', 'fish', 'house', 'tree', 'flower', 'cloud', 'sun', 'bottle', 'banana', 'pizza', 'donut'];
let advance;

let sketchpad;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { labels };
} else {
  sketchpad = new Sketchpad(document.getElementById('sketchpadContainer'));
  advance = document.getElementById('advance');
}

let index = 0;

const data = {
  name: null,
  session: new Date().getTime(),
  drawings: {},
};


function start() {
  const name = document.getElementById('name');
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
  data.drawings[labels[labels.length - 1]] = sketchpad.paths;
  document.getElementById('instructions').innerText = 'Thank you for your participation!';
  advance.innerText = 'Save';
  advance.onclick = save;

  document.getElementById('sketchpadContainer').classList.add('invisible');
}

function save() {
  document.getElementById('instructions').innerText = 'Send the downloaded file to the hackcraft_@hotmail.com';

  advance.onclick = () => window.location.href = '../../visualiser';
  advance.innerText = 'See Others\' Drawings';

  const download = document.createElement('a');
  download.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;

  download.download = `${data.name}_${data.session}.json`;

  download.click();
  document.removeChild(download);


}
