// Learning Hub — standalone tab controller.
// Reads whatever <article class="topic-panel" data-topic-id data-topic-label>
// blocks exist in the page and wires up a tab bar for them. Adding a new
// topic later means adding a new <article> block; no changes needed here.

(function () {
  var tabsEl = document.getElementById('topic-tabs');
  var panels = Array.prototype.slice.call(document.querySelectorAll('.topic-panel'));
  if (!tabsEl || !panels.length) return;

  function activate(id, updateHash) {
    panels.forEach(function (panel) {
      var isActive = panel.dataset.topicId === id;
      panel.hidden = !isActive;
    });
    Array.prototype.forEach.call(tabsEl.children, function (btn) {
      btn.setAttribute('aria-selected', String(btn.dataset.topicId === id));
    });
    if (updateHash && history.replaceState) {
      history.replaceState(null, '', '#' + id);
    }
  }

  panels.forEach(function (panel) {
    var id = panel.dataset.topicId;
    var btn = document.createElement('button');
    btn.className = 'topic-tab';
    btn.type = 'button';
    btn.dataset.topicId = id;
    btn.setAttribute('role', 'tab');
    btn.textContent = panel.dataset.topicLabel || id;
    btn.addEventListener('click', function () { activate(id, true); });
    tabsEl.appendChild(btn);
  });

  var initial = (location.hash || '').replace('#', '');
  var hasInitial = panels.some(function (p) { return p.dataset.topicId === initial; });
  activate(hasInitial ? initial : panels[0].dataset.topicId, false);
})();
