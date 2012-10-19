chrome.contextMenus.create(
  { title: 'Drag Element'
  , contexts: [ 'all' ]
  , onclick: initDragging
  });

function initDragging(cmenu, tab) {
  chrome.tabs.sendMessage(tab.id, { start: true });
}
