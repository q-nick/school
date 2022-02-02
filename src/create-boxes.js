const repeat = (counter, callback) => {
  for (let index = 0; index < counter; index += 1) {
    callback(index);
  }
};

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const createBoxes = (amount) => {
  const boxes = [];

  repeat(amount, (index) => {
    boxes.push({
      size: 30 + index * 10,
      color: getRandomHexColor(),
    });
  });

  const boxesElements = boxes.map(({ size, color }) => {
    const div = document.createElement('div');

    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    div.style.backgroundColor = color;
    div.style.display = 'inline-block';

    return div;
  });

  document.querySelector('#boxes').replaceChildren(...boxesElements);
};

const destroyBoxes = () => {
  document.querySelector('#boxes').replaceChildren([]);
};

document.querySelector('[data-action=create]').addEventListener('click', () => {
  const { value } = document.querySelector('.js-input');

  if (!+value) {
    alert('Niepoprawna wartość');
  }

  createBoxes(document.querySelector('.js-input').value);
});

document
  .querySelector('[data-action=destroy]')
  .addEventListener('click', () => {
    destroyBoxes(document.querySelector('.js-input').value);
  });
