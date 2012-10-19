var node;

window.addEventListener('contextmenu', function (e) { node = e.target; });

chrome.extension.onMessage.addListener(function (req, sender, reply) {
  if (!req.start || !node) return;

  var old_cursor = node.style.cursor;
  node.style.cursor = 'move';

  var orig_top, orig_left;
  if (node.style.position == 'absolute') {
    orig_top  = parseInt(node.style.top,  10);
    orig_left = parseInt(node.style.left, 10);
  }
  else {
    node.style.position = 'relative';
    orig_top = orig_left = 0;
  }

  window.addEventListener('mousedown', down);
  window.addEventListener('mouseup',   up);

  var init_x, init_y;
  function down(e) {
    init_x = e.clientX;
    init_y = e.clientY;
    window.addEventListener('mousemove', move);
    document.body.style.WebkitUserSelect = 'none';
    return false;
  }

  function move(e) {
    node.style.top  = (orig_top  + e.clientY - init_y) + 'px';
    node.style.left = (orig_left + e.clientX - init_x) + 'px';
    return false;
  }

  function up() {
    window.removeEventListener('mousedown', down);
    window.removeEventListener('mouseup',   up);
    window.removeEventListener('mousemove', move);
    node.style.cursor = old_cursor;
    document.body.style.WebkitUserSelect = 'auto';
    return false;
  }
});
