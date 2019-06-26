window.route = [];

function focusSection () {
  let sectionCont = document.getElementById('section-cont');
  sectionCont.focus();
}

function refresh () {
  let toolbarCont = document.getElementById('toolbar-cont');
  console.log('toolbarCont', toolbarCont);
  removeChildNode(toolbarCont);
  drawToolbar(toolbarCont);

  let sectionHeaderCont = document.getElementById('section-header-cont');
  console.log('sectionHeaderCont', sectionHeaderCont);
  removeChildNode(sectionHeaderCont);
  drawSectionHeader(sectionHeaderCont);

  let sectionContentCont = document.getElementById('section-content-cont');
  console.log('sectionContentCont', sectionContentCont);
  unShowChildNode(sectionContentCont);
  drawSectionContent(sectionContentCont);
}

function removeChildNode (node) { while (node.firstChild) node.removeChild(node.firstChild); }

function unShowChildNode (node) { for (let i of node.children) i.classList.add('none'); }

function drawSectionContent (node) {
  if (window.route.length === 0) return;

  let res = window.route.filter(i => i.isFocused)[0];
  for (let i of node.children) if (res.path.indexOf(i.id) > -1) i.classList.remove('none');
}

function drawSectionHeader (node) {
  if (window.route.length === 0) {
    node.classList.add('none');
    return;
  }
  else node.classList.remove('none');
  let children = '';

  for (let i of window.route) {
    let paths = i.path.split('/');

    children += `
    <div class="tab ${i.isFocused ? 'selected' : ''}" onclick="focusTab('${i.path}')">
      <img src="/assets/ic-img/html.png" class="ic-default mr4">
      <div class="mr4">${paths[paths.length - 1]}.html</div>
      <span class="material-icons small-icon close-icon" onclick="closeTab(event, '${i.path}')">close</span>
      <div class="bottom-border"></div>
    </div>
    `
  }
  node.innerHTML = children;
}

function closeTab (e, path) {
  let res = window.route.filter(i => i.path === path)[0];
  let idx = window.route.indexOf(res);
  window.route.splice(idx, 1);

  // 현재의 자식이 꺼져서 focused 된 것이 없을 경우
  let focusedItem = window.route.filter(i => i.isFocused)[0];
  if (window.route.length > 0 && !focusedItem) {
    if (idx === 0) window.route[0].isFocused = true;
    else window.route[idx - 1].isFocused = true;
  }

  e.stopPropagation();

  refresh();
}

function focusTab (path) {
  window.route.map((i) => {
    i.isFocused = i.path === path;
  });

  refresh();
}

function drawToolbar (node) {
  if (window.route.length === 0) return;

  let res = window.route.filter(i => i.isFocused)[0];
  let path = res.path.split('/');
  let children = '';

  for (let i = 0; i < path.length; i++) {
    children += `
      <img src="/assets/ic-img/right-arrow.png" class="ic-right">
      <div class="flex">
        <img class="ic-default mr4" src="${i < path.length - 1 ? '/assets/ic-img/folder.png' : '/assets/ic-img/html.png'}">
        <div>${i < path.length - 1 ? path[i] : path[i] + '.html'}</div>
      </div>
    `
  }
  node.innerHTML = children;
}
