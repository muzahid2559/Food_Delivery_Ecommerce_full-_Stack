class Storage {
  set = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  get = (key) => {
    return JSON.parse(localStorage.getItem(key) ?? "null");
  };
  remove = (key) => localStorage.removeItem(key);
  clear = () => localStorage.clear();
}

export default new Storage();
