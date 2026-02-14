const videosContainer = document.querySelector('.videos-scroll-container');

if (videosContainer) {
  let isVideosDragging = false;
  let videosStartY = 0;
  let videosScrollTop = 0;
  let videosAutoScrollInterval = null;
  let videosScrollDirection = 1;
  const videosAutoScrollSpeed = 0.8;

  const startVideosAutoScroll = () => {
    if (videosAutoScrollInterval) return;
    videosAutoScrollInterval = window.setInterval(() => {
      if (!isVideosDragging) {
        const maxScroll = videosContainer.scrollHeight - videosContainer.clientHeight;
        if (videosContainer.scrollTop >= maxScroll) videosScrollDirection = -1;
        else if (videosContainer.scrollTop <= 0) videosScrollDirection = 1;
        videosContainer.scrollTop += videosAutoScrollSpeed * videosScrollDirection;
      }
    }, 16);
  };

  const stopVideosAutoScroll = () => {
    if (videosAutoScrollInterval) {
      clearInterval(videosAutoScrollInterval);
      videosAutoScrollInterval = null;
    }
  };

  startVideosAutoScroll();

  videosContainer.addEventListener('mousedown', (e) => {
    isVideosDragging = true;
    videosStartY = e.pageY - videosContainer.offsetTop;
    videosScrollTop = videosContainer.scrollTop;
    stopVideosAutoScroll();
  });
  videosContainer.addEventListener('mouseleave', () => {
    if (isVideosDragging) { isVideosDragging = false; setTimeout(() => startVideosAutoScroll(), 1000); }
  });
  videosContainer.addEventListener('mouseup', () => {
    if (isVideosDragging) { isVideosDragging = false; setTimeout(() => startVideosAutoScroll(), 1000); }
  });
  videosContainer.addEventListener('mousemove', (e) => {
    if (!isVideosDragging) return;
    e.preventDefault();
    const y = e.pageY - videosContainer.offsetTop;
    videosContainer.scrollTop = videosScrollTop - (y - videosStartY) * 1.5;
  });

  let videosTouchStartY = 0;
  let videosTouchScrollTop = 0;
  videosContainer.addEventListener('touchstart', (e) => {
    videosTouchStartY = e.touches[0].pageY;
    videosTouchScrollTop = videosContainer.scrollTop;
    stopVideosAutoScroll();
  }, { passive: true });
  videosContainer.addEventListener('touchmove', (e) => {
    videosContainer.scrollTop = videosTouchScrollTop + (videosTouchStartY - e.touches[0].pageY) * 1.5;
  }, { passive: true });
  videosContainer.addEventListener('touchend', () => {
    setTimeout(() => startVideosAutoScroll(), 1000);
  }, { passive: true });
}