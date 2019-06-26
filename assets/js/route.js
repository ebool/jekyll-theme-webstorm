(function (history) {
  /** detect pushState */
  let pushState = history.pushState;
  history.pushState = function (state) {
    drawerPageByPath(arguments[2]);
    return pushState.apply(history, arguments);
  };
  /** detect replaceState */
  let replaceState = history.replaceState;
  history.replaceState = function (state) {
    drawerPageByPath(arguments[2]);
    return replaceState.apply(history, arguments);
  };
})(window.history);

function drawerPageByPath (path) {
  // check same file
  for (let i of window.route) {
    if (i.path === path) {
      i.isFocused = true;
      refresh();
      focusSection();
      return;
    }
  }

  window.route.push({ path, isFocused: true});
  refresh();
  focusSection();
}

/** detect popState */
window.addEventListener('popstate', (e) => {
  console.log('popstate', e);
});

function goTo (path) {
  window.history.pushState({}, '', `/${path}`);
}

function replace (path) {
  window.history.replaceState({}, '', `/${path}`);
}
