window.onload = () => drawerPageByPath(window.location.pathname);

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

/** detect popState */
window.addEventListener('popstate', (e) => {
  drawerPageByPath(window.location.pathname);
});

function drawerPageByPath (path) {
  if (!path || path === '/') return;

  // all isFocused makes false;
  for (let i of window.route) i.isFocused = false;

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


function goTo (path) {
  window.history.pushState({}, '', `/${path.replace(/ /gi, '-')}`);
}

function replace (path) {
  window.history.replaceState({}, '', `/${path.replace(/ /gi, '-')}`);
}
