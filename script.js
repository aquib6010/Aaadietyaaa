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

  // ==================== Search Functionality ====================
  const searchInput = document.querySelector('.search-bar input');
  const searchBtn = document.querySelector('.search-btn');

  // Product index for search
  const SEARCH_INDEX = [
    // Rudraksha
    { name: '1 Mukhi Rudraksha', url: 'one-mukhi-rudraksha.html', category: 'Rudraksha' },
    { name: 'Ek Mukhi Rudraksha', url: 'ek-mukhi-rudraksha.html', category: 'Rudraksha' },
    { name: 'Do Mukhi Rudraksha (Plain)', url: 'do-mukhi-rudraksha-plain.html', category: 'Rudraksha' },
    { name: 'Do Mukhi Rudraksha (Silver)', url: 'do-mukhi-rudraksha-silver.html', category: 'Rudraksha' },
    { name: 'Four Mukhi Rudraksha', url: 'four-mukhi-rudraksha.html', category: 'Rudraksha' },
    { name: 'Five Mukhi Rudraksha', url: 'five-mukhi-rudraksha.html', category: 'Rudraksha' },
    { name: 'Eight Mukhi Rudraksha', url: 'eight-mukhi-rudraksha.html', category: 'Rudraksha' },
    { name: 'Nine Mukhi Rudraksha', url: 'nine-mukhi-rudraksha.html', category: 'Rudraksha' },
    { name: 'Eleven Mukhi Rudraksha', url: 'eleven-mukhi-rudraksha.html', category: 'Rudraksha' },
    { name: 'Fourteen Mukhi Rudraksha', url: 'fourteen-mukhi-rudraksha.html', category: 'Rudraksha' },
    { name: 'Fifteen Mukhi Rudraksha', url: 'fifteen-mukhi-rudraksha.html', category: 'Rudraksha' },
    { name: 'Ganesha Rudraksha', url: 'ganesha-rudraksha.html', category: 'Rudraksha' },
    { name: 'Gauri Shankar Rudraksha', url: 'gauri-shankar-rudraksha.html', category: 'Rudraksha' },
    { name: 'Gauri Ganesha Rudraksha', url: 'gauri-ganesha-rudraksha.html', category: 'Rudraksha' },
    { name: 'Garbh Gauri Rudraksha', url: 'garbh-gauri-rudraksha.html', category: 'Rudraksha' },
    { name: 'Dwijuti Rudraksha', url: 'dwijuti-rudraksha.html', category: 'Rudraksha' },
    { name: 'Trijuti Rudraksha', url: 'trijuti-rudraksha.html', category: 'Rudraksha' },
    { name: 'All Rudraksha', url: 'rudraksha.html', category: 'Rudraksha' },

    // Rudraksha Mala
    { name: 'Five Mukhi Rudraksha Mala', url: 'five-mukhi-rudraksha-mala.html', category: 'Rudraksha Mala' },
    { name: 'Seven Mukhi Rudraksha Mala', url: 'seven-mukhi-rudraksha-mala.html', category: 'Rudraksha Mala' },
    { name: 'Black Rudraksha Mala', url: 'black-rudraksha-mala.html', category: 'Rudraksha Mala' },
    { name: 'Black Rudraksha Sphatik Mala', url: 'black-rudraksha-sphatik-mala.html', category: 'Rudraksha Mala' },
    { name: 'Chikna Rudraksha Mala', url: 'chikna-rudraksha-mala.html', category: 'Rudraksha Mala' },
    { name: 'Indonesian Rudraksha Mala (Silver)', url: 'indonesian-rudraksha-mala-silver.html', category: 'Rudraksha Mala' },
    { name: 'Pathri Rudraksha Mala', url: 'pathri-rudraksha-mala.html', category: 'Rudraksha Mala' },
    { name: 'Rudraksha Pearl Mala', url: 'rudraksha-pearl-mala.html', category: 'Rudraksha Mala' },
    { name: 'Rudraksha Crystal Mala', url: 'rudraksha-crystal-mala.html', category: 'Rudraksha Mala' },
    { name: 'Rudraksha Kanthi Mala', url: 'rudraksha-kanthi-mala.html', category: 'Rudraksha Mala' },
    { name: 'All Rudraksha Mala', url: 'rudraksha-mala.html', category: 'Rudraksha Mala' },

    // Raksha Kavach
    { name: 'Maa Shailputri Ka Kavach', url: 'maa-shailputri-kavach.html', category: 'Raksha Kavach' },
    { name: 'Maa Brahmacharini Ka Kavach', url: 'maa-brahmacharini-kavach.html', category: 'Raksha Kavach' },
    { name: 'Maa Chandraghanta Ka Kavach', url: 'maa-chandraghanta-kavach.html', category: 'Raksha Kavach' },
    { name: 'Maa Kushmanda Ka Kavach', url: 'maa-kushmanda-kavach.html', category: 'Raksha Kavach' },
    { name: 'Maa Skandmata Ka Kavach', url: 'maa-skandmata-kavach.html', category: 'Raksha Kavach' },
    { name: 'Maa Katyayani Ka Kavach', url: 'maa-katyayani-kavach.html', category: 'Raksha Kavach' },
    { name: 'Maa Kaalratri Ka Kavach', url: 'maa-kaalratri-kavach.html', category: 'Raksha Kavach' },
    { name: 'Maa Mahagauri Ka Kavach', url: 'maa-mahagauri-kavach.html', category: 'Raksha Kavach' },
    { name: 'Maa Siddhidatri Ka Kavach', url: 'maa-siddhidatri-kavach.html', category: 'Raksha Kavach' },
    { name: 'Ram Tantra Kavach', url: 'ram-tantra-kavach.html', category: 'Raksha Kavach' },
    { name: 'All Raksha Kavach', url: 'raksha-kavach.html', category: 'Raksha Kavach' },

    // Bhojpatra Yantra
    { name: 'Bhojpatra Yantra', url: 'bhojpatra-yantra-detail.html', category: 'Bhojpatra Yantra' },
    { name: 'Bhojpatra Yantra (Silver)', url: 'bhojpatra-yantra-silver.html', category: 'Bhojpatra Yantra' },
    { name: 'Bhojpatra Yantra (Gold)', url: 'bhojpatra-yantra-gold.html', category: 'Bhojpatra Yantra' },
    { name: 'All Bhojpatra Yantra', url: 'bhojpatra-yantra.html', category: 'Bhojpatra Yantra' },

    // Other
    { name: 'Consultation - Book a Session', url: 'consultation.html', category: 'Consultation' },
    { name: 'About Us', url: 'about.html', category: 'Info' },
    { name: 'Contact Us', url: 'contact.html', category: 'Info' },
  ];

  if (searchInput) {
    // Create dropdown
    const dropdown = document.createElement('div');
    dropdown.id = 'search-dropdown';
    dropdown.style.cssText = 'display:none;position:absolute;top:100%;left:0;right:0;background:#fff;border-radius:0 0 12px 12px;box-shadow:0 8px 32px rgba(0,0,0,0.15);max-height:320px;overflow-y:auto;z-index:10000;border:1px solid #eee;border-top:none;';
    searchInput.parentElement.style.position = 'relative';
    searchInput.parentElement.appendChild(dropdown);

    // Search & show results
    searchInput.addEventListener('input', function() {
      const query = this.value.trim().toLowerCase();
      if (query.length < 2) { dropdown.style.display = 'none'; return; }

      const results = SEARCH_INDEX.filter(item =>
        item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
      ).slice(0, 8);

      if (results.length === 0) {
        dropdown.innerHTML = '<div style="padding:16px;text-align:center;color:#999;font-size:14px;">No results found</div>';
      } else {
        dropdown.innerHTML = results.map(item => `
          <a href="${item.url}" style="display:flex;align-items:center;gap:12px;padding:12px 16px;text-decoration:none;color:#1a1a2e;border-bottom:1px solid #f5f5f5;transition:background .2s;" onmouseover="this.style.background='#fff8f5'" onmouseout="this.style.background=''">
            <span style="font-size:20px;">${item.category === 'Rudraksha' ? '📿' : item.category === 'Rudraksha Mala' ? '📿' : item.category === 'Raksha Kavach' ? '🛡️' : item.category === 'Bhojpatra Yantra' ? '📜' : item.category === 'Consultation' ? '🔮' : 'ℹ️'}</span>
            <div><div style="font-weight:600;font-size:14px;">${item.name}</div><div style="font-size:11px;color:#999;">${item.category}</div></div>
          </a>
        `).join('');
      }
      dropdown.style.display = 'block';
    });

    // Focus animation
    searchInput.addEventListener('focus', () => {
      searchInput.parentElement.style.transform = 'scale(1.01)';
    });
    searchInput.addEventListener('blur', () => {
      searchInput.parentElement.style.transform = 'scale(1)';
      setTimeout(() => { dropdown.style.display = 'none'; }, 200);
    });

    // Enter key or search button
    function performSearch() {
      const query = searchInput.value.trim().toLowerCase();
      if (!query) return;
      const result = SEARCH_INDEX.find(item =>
        item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
      );
      if (result) {
        window.location.href = result.url;
      } else {
        dropdown.innerHTML = '<div style="padding:16px;text-align:center;color:#999;font-size:14px;">No results found</div>';
        dropdown.style.display = 'block';
      }
    }

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); performSearch(); }
    });

    if (searchBtn) {
      searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        performSearch();
      });
    }
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

  // ==================== Navaratri Sale Badge on Product Detail Pages ====================
  const mainImage = document.querySelector('.detail-image-area .main-image');
  if (mainImage && !mainImage.querySelector('.navaratri-badge')) {
    const badge = document.createElement('span');
    badge.className = 'navaratri-badge';
    badge.innerHTML = '🎉 Navaratri Sale';
    badge.style.cssText = 'position:absolute;top:12px;left:12px;background:linear-gradient(135deg,#e74c3c,#c0392b);color:#fff;padding:6px 14px;border-radius:6px;font-size:13px;font-weight:700;z-index:10;box-shadow:0 3px 12px rgba(231,76,60,0.3);';
    mainImage.style.position = 'relative';
    mainImage.appendChild(badge);
  }

  // ==================== Special Navaratri Benefits Text ====================
  const detailActions = document.querySelector('.detail-actions');
  if (detailActions && !document.querySelector('.navaratri-benefits-notice')) {
    const notice = document.createElement('div');
    notice.className = 'navaratri-benefits-notice';
    notice.innerHTML = '🎉 <strong>Special benefits if purchased during Navaratri</strong> — Enhanced spiritual energy & divine blessings!';
    notice.style.cssText = 'background:linear-gradient(135deg,#fff3e0,#ffe0b2);border:2px solid #f38321;border-radius:10px;padding:12px 18px;margin-top:16px;font-size:14px;color:#e65100;text-align:center;animation:pulse 2s ease-in-out infinite;';
    detailActions.insertAdjacentElement('afterend', notice);

    // Add pulse animation
    if (!document.querySelector('#navaratri-pulse-style')) {
      const style = document.createElement('style');
      style.id = 'navaratri-pulse-style';
      style.textContent = '@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(243,131,33,0.3)}50%{box-shadow:0 0 0 8px rgba(243,131,33,0)}}';
      document.head.appendChild(style);
    }
  }

  // ==================== Navaratri Sale Badge on Listing Pages ====================
  document.querySelectorAll('.listing-product-img').forEach(imgDiv => {
    if (!imgDiv.querySelector('.discount-badge')) {
      const badge = document.createElement('span');
      badge.className = 'discount-badge';
      badge.innerHTML = '🎉 Navaratri Sale';
      badge.style.cssText = 'background:linear-gradient(135deg,#e74c3c,#c0392b);';
      imgDiv.style.position = 'relative';
      imgDiv.appendChild(badge);
    }
  });

});
