(() => {
  const PICKUP_LINES_URL = 'https://pickup-lines.herokuapp.com/api';

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

  const createTemplate = line => {
    return (
      `<div class='fadeIn'>` +
      `<p class="pickup-line">${line}</p>` +
      `<cite class="author">Anonymous</cite>` +
      `</div>`
    );
  };

  const getRandomPickupLine = cb => {
    fetch(`${PICKUP_LINES_URL}/random`)
      .then(res => res.json())
      .then(data => {
        const { data: line } = data;
        cb(line);
      })
      .catch(err => console.log(err.message));
  };

  getRandomPickupLine(updatePage);
})();
