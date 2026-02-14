const photosContainer = document.querySelector('.photos-scroll-container');

if (photosContainer) {
  let isPhotosDragging = false;
  let photosStartX = 0;
  let photosScrollLeft = 0;
  let rafId = null;
  let photosScrollDirection = 1;
  let isPaused = false;
  const photosAutoScrollSpeed = 0.6; // px per frame

  // ─── rAF loop ────────────────────────────────────────────────────────────────
  const tick = () => {
    if (!isPaused && !isPhotosDragging) {
      const maxScroll = photosContainer.scrollWidth - photosContainer.clientWidth;
      if (photosContainer.scrollLeft >= maxScroll) photosScrollDirection = -1;
      else if (photosContainer.scrollLeft <= 0)    photosScrollDirection =  1;
      photosContainer.scrollLeft += photosAutoScrollSpeed * photosScrollDirection;
    }
    rafId = requestAnimationFrame(tick);
  };

  // ─── Preload images, then start ──────────────────────────────────────────────
  const images = Array.from(photosContainer.querySelectorAll('img'));

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
      img.addEventListener('error', onLoad, { once: true }); // don't block on broken imgs
    });
  };

  startWhenReady();

  // ─── Pause / resume helpers ──────────────────────────────────────────────────
  const pause  = () => { isPaused = true; };
  const resume = (delay = 1200) => setTimeout(() => { isPaused = false; }, delay);

  // ─── Mouse drag ──────────────────────────────────────────────────────────────
  photosContainer.addEventListener('mousedown', (e) => {
    isPhotosDragging = true;
    photosStartX    = e.pageX - photosContainer.offsetLeft;
    photosScrollLeft = photosContainer.scrollLeft;
    pause();
  });

  photosContainer.addEventListener('mouseleave', () => {
    if (isPhotosDragging) { isPhotosDragging = false; resume(); }
  });

  photosContainer.addEventListener('mouseup', () => {
    if (isPhotosDragging) { isPhotosDragging = false; resume(); }
  });

  photosContainer.addEventListener('mousemove', (e) => {
    if (!isPhotosDragging) return;
    e.preventDefault();
    const x = e.pageX - photosContainer.offsetLeft;
    photosContainer.scrollLeft = photosScrollLeft - (x - photosStartX) * 0.8;
  });

  // ─── Touch drag ──────────────────────────────────────────────────────────────
  let photosTouchStartX    = 0;
  let photosTouchScrollLeft = 0;

  photosContainer.addEventListener('touchstart', (e) => {
    photosTouchStartX    = e.touches[0].pageX;
    photosTouchScrollLeft = photosContainer.scrollLeft;
    pause();
  }, { passive: true });

  photosContainer.addEventListener('touchmove', (e) => {
    photosContainer.scrollLeft =
      photosTouchScrollLeft + (photosTouchStartX - e.touches[0].pageX) * 0.8;
  }, { passive: true });

  photosContainer.addEventListener('touchend', () => resume(), { passive: true });
}
