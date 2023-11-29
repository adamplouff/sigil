export default {
  // methods: {
    checkLocalPrefs(id = null) {
      let storage = window.localStorage;
      let defaults = storage.getItem("sigil-prefs");
      if (!defaults) {
        storage.setItem(
          "sigil-prefs",
          JSON.stringify({
            fold: [],
            toggle: [],
            input: [],
            inputScroll: [],
            dropdown: [],
            textArea: [],
            fileInput: [],
          })
        );
      }
    },
    checkPrefsFor(id, type) {
      let prefs = this.getPrefs();
      if (!prefs[type] || !prefs[type].length) return null;
      let target = prefs[type].find((item) => {
        return item.id == id;
      });
      return target ? target : null;
    },
    setPrefs(data) {
      return window.localStorage.setItem(
        "sigil-prefs",
        JSON.stringify(data)
      );
    },
    getPrefs() {
      this.checkLocalPrefs();
      return JSON.parse(window.localStorage.getItem("sigil-prefs"));
    },
    setPrefsById(id, value, type) {
      let wasFound = false;
      let prefs = this.getPrefs();
      Object.keys(prefs).forEach((key) => {
        let foundItem = prefs[key].find((item) => {
          return item.id == id;
        });
        if (foundItem) (foundItem.value = value), (wasFound = true);
      });
      if (!wasFound) {
        if (Object.keys(prefs).includes(type))
          prefs[type].push({
            id,
            value: value,
          });
        else {
          prefs[type] = [
            {
              id: id,
              value: value,
            },
          ];
        }
      }
      return this.setPrefs(prefs);
    },
    deletePrefs() {
      window.localStorage.removeItem("sigil-prefs");
    },
  // },
};
