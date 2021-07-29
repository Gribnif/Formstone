// Storage

var Storage = {
  _store: new WeakMap(),

  set: function(el, key, obj) {
    if (!this._store.has(el)) {
      this._store.set(el, new Map());
    }
    this._store.get(el).set(key, obj);
  },

  get: function(el, key) {
    return this._store.get(el).get(key);
  },

  exists: function(el, key) {
    return this._store.has(el) && this._store.get(el).has(key);
  },

  delete: function(el, key) {
    var ret = this._store.get(el).delete(key);

    if (!this._store.get(el).size === 0) {
      this._store.delete(el);
    }

    return ret;
  }
};