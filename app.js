// 诗词浏览器 — 共享逻辑
// 由 index.html / bai-juyi.html 等入口设置 window.POET 后加载

(async function () {
  const poet = window.POET || 'xin-qiji';

  let data;
  try {
    const res = await fetch(`data/${poet}.json`);
    data = await res.json();
  } catch (e) {
    document.title = '加载失败';
    document.getElementById('btnReveal').textContent = '数据加载失败，请刷新';
    return;
  }

  // 设置标题
  document.title = data.title;

  // 设置按钮文字
  var btn = document.getElementById('btnReveal');
  btn.textContent = data.buttonText;

  // 全局曝光 reveal 函数
  window.reveal = function () {
    var verses = data.verses;
    var indices = data.weightedIndices || [];
    var multiplier = data.weightMultiplier || 1;

    // 构建加权数组
    var weighted = verses.slice();
    for (var m = 1; m < multiplier; m++) {
      for (var i = 0; i < indices.length; i++) {
        weighted.push(verses[indices[i]]);
      }
    }

    var idx = Math.floor(Math.random() * weighted.length);
    document.getElementById('verseText').textContent = weighted[idx];

    btn.classList.add('gone');

    setTimeout(function () {
      document.getElementById('verseDisplay').classList.add('show');
    }, 200);
  };
})();
