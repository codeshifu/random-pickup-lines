(() => {
  const PICKUP_LINES_URL = 'https://pickup-lines.herokuapp.com/api';
  const PICKUP_LINES_API = 'https://pickup-lines.herokuapp.com/api';

  window.qs = (target, scope) => (scope || document).querySelector(target);

  class PickupLinesDB {
    constructor() {
      this.idb = idb.open('pickup-lines', 1, db => this._upgradeDB(db));
      this.STORE_LINES = 'lines';
    }

    _upgradeDB(db) {
      switch (db.oldVersion) {
        case 0:
          db.createObjectStore(this.STORE_LINES);
      }
    }

    getAll() {
      return this.idb.then(db =>
        db
          .transaction(this.STORE_LINES)
          .objectStore(this.STORE_LINES)
          .getAll()
      );
    }

    create(pickupLines) {
      this.idb.then(db => {
        const tx = db.transaction(this.STORE_LINES, 'readwrite');
        tx.objectStore(this.STORE_LINES).put(pickupLines, 'data');

        return tx.complete;
      });
    }
  }

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

  const createTemplate = pickupLine => {
    return (
      `<div class='fadeIn'>` +
      `<p class="pickup-line">${pickupLine}</p>` +
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

  const pickupLineDB = new PickupLinesDB();
  window.db = pickupLineDB;
  getRandomPickupLine(updatePage);
  new PickupLinesDB();
})();
