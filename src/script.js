/* ===== ハンバーガーメニュー ===== */
function toggleNav() {
  document.querySelector('nav').classList.toggle('nav-open');
}


/* ===== スクリーンショットカルーセル（1枚表示・スワイプ／ドラッグ対応） ===== */
(function () {
  const carousel = document.querySelector('.screenshot-carousel');
  const track = document.querySelector('.screenshot-track');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.carousel-btn--prev');
  const nextBtn = document.querySelector('.carousel-btn--next');
  if (!carousel || !track) return;

  const imgs = track.querySelectorAll('img');
  let currentIndex = 0;

  // ナビボタンの表示状態を更新する
  function updateButtons() {
    if (prevBtn) prevBtn.classList.toggle('hidden', currentIndex === 0);
    if (nextBtn) nextBtn.classList.toggle('hidden', currentIndex === imgs.length - 1);
  }

  // 指定インデックスにスライドしてドットを更新する
  function goTo(index) {
    currentIndex = Math.max(0, Math.min(index, imgs.length - 1));
    const itemWidth = carousel.offsetWidth;
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
    updateButtons();
  }

  // タッチ：スワイプまたは左右タップで切り替え
  let touchStartX = 0;
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  carousel.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = touchStartX - endX;
    if (Math.abs(diff) > 40) {
      // 40px以上のスワイプで切り替え
      goTo(currentIndex + (diff > 0 ? 1 : -1));
    } else if (Math.abs(diff) < 10) {
      // ほぼ動いていない場合はタップとみなし、左右半分で切り替え
      const rect = carousel.getBoundingClientRect();
      const tapX = endX - rect.left;
      goTo(currentIndex + (tapX < rect.width / 2 ? -1 : 1));
    }
  });

  // マウス：ドラッグまたは左右クリックで切り替え
  let isDown = false;
  let startX = 0;
  carousel.addEventListener('mousedown', (e) => { isDown = true; startX = e.clientX; });
  carousel.addEventListener('mouseleave', () => { isDown = false; });
  carousel.addEventListener('mouseup', (e) => {
    if (!isDown) return;
    isDown = false;
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 40) {
      // 40px以上のドラッグで切り替え
      goTo(currentIndex + (diff > 0 ? 1 : -1));
    } else if (Math.abs(diff) < 10) {
      // ほぼ動いていない場合はクリックとみなし、左右半分で切り替え
      const rect = carousel.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      goTo(currentIndex + (clickX < rect.width / 2 ? -1 : 1));
    }
  });

  // 左右ボタンのクリックイベント
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  // 初期化
  goTo(0);
})();

/* ===== Q&Aアコーディオン ===== */
function toggleQA(btn) {
  const item = btn.closest('.qa-item');
  // 同じカテゴリ（日/英）の他を閉じる
  document.querySelectorAll('.qa-item').forEach(i => {
    if (i !== item) i.classList.remove('open');
  });
  item.classList.toggle('open');
}
