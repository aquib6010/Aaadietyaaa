// ==================== AstroJyotishi (Pandit Layout) - Interactive Features ====================

document.addEventListener('DOMContentLoaded', () => {

  // ==================== Hero Slider ====================
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopSlider() {
    clearInterval(slideInterval);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopSlider();
      goToSlide(parseInt(dot.dataset.slide));
      startSlider();
    });
  });

  if (slides.length > 0) {
    startSlider();
  }

  // ==================== Carousel Navigation ====================
  document.querySelectorAll('.carousel-nav').forEach(btn => {
    btn.addEventListener('click', () => {
      const carouselId = btn.dataset.carousel;
      const carousel = document.getElementById(carouselId);
      if (!carousel) return;

      const scrollAmount = 260;
      if (btn.classList.contains('prev')) {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    });
  });

  // ==================== Back to Top ====================
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==================== Header Sticky Shadow ====================
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
      header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
    }
  });

  // ==================== Search Bar Focus Animation ====================
  const searchInput = document.querySelector('.search-bar input');
  if (searchInput) {
    searchInput.addEventListener('focus', () => {
      searchInput.parentElement.style.transform = 'scale(1.01)';
    });
    searchInput.addEventListener('blur', () => {
      searchInput.parentElement.style.transform = 'scale(1)';
    });
  }

  // ==================== Intersection Observer for Animations ====================
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        animateOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add initial hidden state and observe
  document.querySelectorAll('.section-heading, .selection-card, .testimonial-card, .trust-card, .blog-card, .featured-logo').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(el);
  });

  // Add stagger delay for grid items
  document.querySelectorAll('.selections-grid .selection-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  document.querySelectorAll('.testimonials-grid .testimonial-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  document.querySelectorAll('.trust-grid .trust-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  document.querySelectorAll('.blog-grid .blog-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  // Add to Cart Button Animation is handled by cart.js

  // ==================== Nav Link Hover ====================
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.background = 'rgba(255, 255, 255, 0.15)';
    });
    link.addEventListener('mouseleave', () => {
      if (!link.classList.contains('active')) {
        link.style.background = '';
      }
    });
  });

});
