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

export default PickupLinesDB;
