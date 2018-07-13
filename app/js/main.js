import PickupLineDB from './pickupLineDB';

(() => {
  const db = new PickupLineDB();

  const PICKUP_LINES_API = 'https://pickup-lines.herokuapp.com/api';
  const BASE_URL_DEV = 'http://localhost:8888/api';

  window.qs = (target, scope) => (scope || document).querySelector(target);

  const lineBox = qs('.pickup-line-box');
  const loader = qs('.loader');
  const refreshButton = qs('.fab');

  refreshButton.addEventListener('click', () => {
    loader.classList.remove('hidden');
    getRandomPickupLine(updatePage);
  });

  const updatePage = pickupLine => {
    loader.classList.add('hidden');
    lineBox.innerHTML = createTemplate(pickupLine);
  };

  const simulateLoading = (cb, data) => {
    setTimeout(function() {
      cb(data);
    }, 1500);
  };

  const createTemplate = pickupLine => {
    return (
      `<div class='fadeIn'>` +
      `<p class="pickup-line">${pickupLine}</p>` +
      `<cite class="author">Anonymous</cite>` +
      `</div>`
    );
  };

  const roll = arr => Math.round(Math.random() * (arr.length - 1));

  const generateRandomLine = pickupLines => {
    const keys = Object.keys(pickupLines),
      randomKeyIndex = roll(keys),
      lines = pickupLines[keys[randomKeyIndex]],
      randomLine = lines[roll(lines)];

    return randomLine;
  };

  const getRandomPickupLine = async cb => {
    const pickupLines = await db.getAll();
    if (pickupLines && pickupLines.length > 0) {
      simulateLoading(cb, generateRandomLine(pickupLines[0]));
    } else {
      fetch(`${BASE_URL_DEV}/random`)
        .then(res => res.json())
        .then(result => {
          cb(result.data);
        })
        .catch(err => console.log(err.message));
    }
  };

  const getPickupLines = cb => {
    fetch(BASE_URL_DEV)
      .then(res => res.json())
      .then(result => cb(result.data))
      .catch(err => console.log(err.message));
  };

  getRandomPickupLine(updatePage);
  getPickupLines(data => db.create(data));
})();
