const videosContainer = document.querySelector('.videos-scroll-container');

if (videosContainer) {
  let isVideosDragging = false;
  let videosStartY = 0;
  let videosScrollTop = 0;
  let rafId = null;
  let videosScrollDirection = 1;
  let isPaused = false;
  const videosAutoScrollSpeed = 0.6; // px per frame

  // ─── rAF loop (asse verticale) ───────────────────────────────────────────────
  const tick = () => {
    if (!isPaused && !isVideosDragging) {
      const maxScroll = videosContainer.scrollHeight - videosContainer.clientHeight;
      if (videosContainer.scrollTop >= maxScroll) videosScrollDirection = -1;
      else if (videosContainer.scrollTop <= 0)    videosScrollDirection =  1;
      videosContainer.scrollTop += videosAutoScrollSpeed * videosScrollDirection;
    }
    rafId = requestAnimationFrame(tick);
  };

  // ─── Preload thumbnail images, then start ────────────────────────────────────
  const images = Array.from(videosContainer.querySelectorAll('img'));

  const startWhenReady = () => {
    const pending = images.filter(img => !img.complete);
    if (pending.length === 0) {
      rafId = requestAnimationFrame(tick);
      return;
    }
    let loaded = 0;
    const onLoad = () => {
      loaded++;
      if (loaded >= pending.length) rafId = requestAnimationFrame(tick);
    };
    pending.forEach(img => {
      img.addEventListener('load',  onLoad, { once: true });
      img.addEventListener('error', onLoad, { once: true }); // non bloccare su thumbnail mancanti
    });
  };

  startWhenReady();

  // ─── Pause / resume helpers ──────────────────────────────────────────────────
  const pause  = () => { isPaused = true; };
  const resume = (delay = 1200) => setTimeout(() => { isPaused = false; }, delay);

  // ─── Mouse drag ──────────────────────────────────────────────────────────────
  videosContainer.addEventListener('mousedown', (e) => {
    isVideosDragging = true;
    videosStartY    = e.pageY - videosContainer.offsetTop;
    videosScrollTop = videosContainer.scrollTop;
    pause();
  });

  videosContainer.addEventListener('mouseleave', () => {
    if (isVideosDragging) { isVideosDragging = false; resume(); }
  });

  videosContainer.addEventListener('mouseup', () => {
    if (isVideosDragging) { isVideosDragging = false; resume(); }
  });

  videosContainer.addEventListener('mousemove', (e) => {
    if (!isVideosDragging) return;
    e.preventDefault();
    const y = e.pageY - videosContainer.offsetTop;
    videosContainer.scrollTop = videosScrollTop - (y - videosStartY) * 1.5;
  });

  // ─── Touch drag ──────────────────────────────────────────────────────────────
  let videosTouchStartY    = 0;
  let videosTouchScrollTop = 0;

  videosContainer.addEventListener('touchstart', (e) => {
    videosTouchStartY    = e.touches[0].pageY;
    videosTouchScrollTop = videosContainer.scrollTop;
    pause();
  }, { passive: true });

  videosContainer.addEventListener('touchmove', (e) => {
    videosContainer.scrollTop =
      videosTouchScrollTop + (videosTouchStartY - e.touches[0].pageY) * 1.5;
  }, { passive: true });

  videosContainer.addEventListener('touchend', () => resume(), { passive: true });
}
