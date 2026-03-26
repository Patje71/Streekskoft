document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let currentImages = [];
  let currentIndex = 0;

  function openLightbox(images, index) {
    currentImages = images;
    currentIndex = index;
    lightboxImg.src = currentImages[currentIndex];
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    updateNavButtons();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    currentImages = [];
    currentIndex = 0;
  }

  function showPrev() {
    if (currentImages.length <= 1) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    lightboxImg.src = currentImages[currentIndex];
    updateNavButtons();
  }

  function showNext() {
    if (currentImages.length <= 1) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    lightboxImg.src = currentImages[currentIndex];
    updateNavButtons();
  }

  function updateNavButtons() {
    const hasMultiple = currentImages.length > 1;
    prevBtn.style.display = hasMultiple ? 'block' : 'none';
    nextBtn.style.display = hasMultiple ? 'block' : 'none';
  }

  // --- Gallery images (full slideshow across all gallery tiles) ---
  const galleryImgs = Array.from(document.querySelectorAll('.gallery-item img'));
  const galleryUrls = galleryImgs.map(img => img.src);
  galleryImgs.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(galleryUrls, index));
  });

  // --- Room images (slideshow via data-images attribute) ---
  document.querySelectorAll('.room-image').forEach(img => {
    img.addEventListener('click', () => {
      const raw = img.getAttribute('data-images');
      const images = raw ? raw.split(',').map(s => s.trim()) : [img.src];
      openLightbox(images, 0);
    });
  });

  // --- Controls ---
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn)  prevBtn.addEventListener('click', showPrev);
  if (nextBtn)  nextBtn.addEventListener('click', showNext);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft')  showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  // Close when clicking outside the image (on the overlay)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
