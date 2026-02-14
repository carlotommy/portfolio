const lightbox = document.getElementById('photoLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.querySelector('.lightbox-close');

document.addEventListener('click', (e) => {
  const target = e.target;
  const photoItem = target.closest('.photo-item');
  if (photoItem && !target.closest('.lightbox')) {
    const img = photoItem.querySelector('img');
    if (img && lightboxImage && lightbox) {
      lightboxImage.src = img.src;
      lightbox.classList.add('active');
    }
  }
});

lightboxClose?.addEventListener('click', () => lightbox.classList.remove('active'));

lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target === lightboxImage) {
    lightbox.classList.remove('active');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
    lightbox.classList.remove('active');
  }
});