const gridContainer = document.getElementById('container');
const submitButton = document.getElementById('submit-button');
const settingsFormElement = document.getElementById('robot-settings');
const actionsFormElement = document.getElementById('robot-actions');
let grid = [];
let lastFormData = {};

settingsFormElement.addEventListener('submit', async event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const startX = +formData.get('start-x');
  const startY = +formData.get('start-y');
  const startOrientation = formData.get('start-orientation');
  const gridSize = +formData.get('grid-size');

  if (grid.length === 0 || lastFormData.gridSize !== gridSize) {
    generateGrid(gridSize);
  }

  await updateRoom(gridSize, gridSize);
  await updateRobot(startX, startY, startOrientation);
  positionRobot(x, y, startOrientation);
  lastFormData = { gridSize };
});

actionsFormElement.addEventListener('submit', async event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const moveSequence = formData.get('move-sequence');
  const result = await moveRobot(moveSequence);
  positionRobot(result.x, result.y, result.orientation);
});

function generateGrid(size) {
  clearChildren(gridContainer);
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.backgroundColor = `black`;

  grid = range(+size).map(x =>
    range(+size).map(y => {
      const element = document.createElement('div');
      gridContainer.appendChild(element);
      return element;
    })
  );
}

function generateRobot() {
  const element = document.createElement('span');
  element.classList.add('iconify', 'active');
  element.setAttribute('data-icon', 'mdi-robot-vacuum');
  element.setAttribute('icon-inline', false);
  return element;
}

function positionRobot(x, y, orientation) {
  currentRobot = document.querySelector('.active');
  if (currentRobot) {
    clearChildren(currentRobot.parentElement);
  }

  const robot = generateRobot();
  const degrees = cardinalToDegrees(orientation);
  robot.setAttribute('data-rotate', `${degrees}deg`);

  const element = grid[x][y];
  if (element) {
    element.appendChild(robot);
  }
}

async function updateRobot(x, y, orientation) {
  return await callApi('/api/robot', { method: 'PUT', body: { x, y, orientation } });
}

async function updateRoom(width, height) {
  return callApi('/api/room', { method: 'PUT', body: { width, depth: height } });
}

async function moveRobot(sequence) {
  return callApi('/api/robot/actions', {
    method: 'POST',
    body: { type: 'move', params: sequence }
  });
}