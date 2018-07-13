import PickupLineDB from './pickupLineDB';
// register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw.js', { scope: '/random-pickup-lines/' })
      .then(reg => console.log('serviceWorker registered.'))
      .catch(err =>
        console.log('failed to register serviceWorker.', err.message)
      );
  });
}

window.$app = {};

window.addEventListener('beforeinstallprompt', event => {
  // delay prompting users to add to homescreen on first visit
  event.preventDefault();
  // Stash the event so it can be triggered later.
  $app.promptEvent = event;
  console.log($app);
});

const db = new PickupLineDB();

const PICKUP_LINES_API = 'https://pickup-lines.herokuapp.com/api';

window.qs = (target, scope) => (scope || document).querySelector(target);

const lineBox = qs('.pickup-line-box');
const loader = qs('.loader');
const refreshButton = qs('.fab');
const snackbar = qs('#snackbar');

refreshButton.addEventListener('click', () => {
  showLoader();
  getRandomPickupLine(updatePage);
  showA2HSPrompt();
});

const showA2HSPrompt = () => {
  $app.promptEvent.prompt();
  $app.promptEvent.userChoice.then(handleA2HSResponse);
};

const handleA2HSResponse = choice => {
  if (choice.outcome === 'accepted') {
    openSnackBar('Added to homescreen.');
  } else {
    openSnackBar("Ok I won't add it");
  }
  $app.promptEvent = null;
};

const updatePage = pickupLine => {
  hideLoader();
  lineBox.innerHTML = createTemplate(pickupLine);
};

const simulateLoading = (cb, data) => {
  setTimeout(function() {
    cb(data);
  }, 1500);
};

const hideLoader = () => loader.classList.add('hidden');
const showLoader = () => loader.classList.remove('hidden');
const openSnackBar = msg => {
  snackbar.textContent = msg;
  snackbar.classList.add('show');
  setTimeout(() => {
    snackbar.classList.remove('show');
  }, 3000);
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
    fetch(`${PICKUP_LINES_API}/random`)
      .then(res => res.json())
      .then(result => {
        cb(result.data);
      })
      .catch(err => {
        hideLoader();
        openSnackBar('You are offline.');
      });
  }
};

const getPickupLines = cb => {
  fetch(PICKUP_LINES_API)
    .then(res => res.json())
    .then(result => cb(result.data))
    .catch(err => console.log(err.message));
};

getRandomPickupLine(updatePage);
// getPickupLines(data => db.create(data));
