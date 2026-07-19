document.addEventListener('DOMContentLoaded', () => {
  // --- DATABASE & SIMULATOR DATA ---
  const BODY_PARTS = {
    neck: {
      name: 'Cuello',
      desc: 'Ideal para aliviar la tensión acumulada en la base del cráneo y los hombros debido al estrés diario o malas posturas.'
    },
    back: {
      name: 'Espalda',
      desc: 'Masaje profundo y penetrante para relajar las contracturas en los omóplatos y la zona dorsal superior.'
    },
    waist: {
      name: 'Cintura / Zona Lumbar',
      desc: 'Alivia la carga y el dolor de espalda baja tras estar sentado o de pie por largos periodos.'
    },
    limbs: {
      name: 'Extremidades (Brazos / Piernas)',
      desc: 'Excelente para aliviar el cansancio en pantorrillas y muslos después del ejercicio, o relajar los antebrazos.'
    }
  };

  const MASSAGE_MODES = {
    1: {
      name: 'Modo 1: Combinado (Mixto)',
      desc: 'Una mezcla de todas las técnicas de vibración para una relajación general del cuerpo.',
      speed: '1.5s'
    },
    2: {
      name: 'Modo 2: Masaje Suave',
      desc: 'Simula toques ligeros y rítmicos para relajar y calmar zonas ligeramente fatigadas.',
      speed: '2s'
    },
    3: {
      name: 'Modo 3: Amasamiento Profundo',
      desc: 'Masaje de presión circular ideal para contracturas crónicas y nudos musculares.',
      speed: '1.2s'
    },
    4: {
      name: 'Modo 4: Acupuntura Eléctrica',
      desc: 'Estimulación por microimpulsos que imita el efecto terapéutico de la acupuntura.',
      speed: '0.8s'
    },
    5: {
      name: 'Modo 5: Golpeteo Rítmico (Tapping)',
      desc: 'Vibraciones rápidas y rítmicas que estimulan la circulación sanguínea y activan la energía.',
      speed: '0.6s'
    },
    6: {
      name: 'Modo 6: Raspado (Scraping)',
      desc: 'Presión lineal y continua para disipar tensiones en las capas musculares superficiales.',
      speed: '1.4s'
    },
    7: {
      name: 'Modo 7: Tonificación Muscular',
      desc: 'Microcorrientes de intensidad variable diseñadas para ejercitar y desestresar el músculo.',
      speed: '1s'
    },
    8: {
      name: 'Modo 8: Relajación Profunda',
      desc: 'Ondas continuas de baja frecuencia ideales para preparar el cuerpo antes de dormir.',
      speed: '2.5s'
    }
  };

  // --- PROMOTIONS DATA ---
  const PROMOTIONS = {
    1: {
      name: '1 Unidad - Masajeador Mariposa',
      price: 49,
      delivery: 'Envío Regular S/. 10',
      total: 59,
      savings: 0,
      badge: 'Básico'
    },
    2: {
      name: '2 Unidades - Duplica el Alivio',
      price: 89,
      delivery: 'Envío Gratis a todo el Perú',
      total: 89,
      savings: 9,
      badge: '¡El más vendido!'
    },
    3: {
      name: '3 Unidades - Pack Familiar',
      price: 119,
      delivery: 'Envío Gratis + Regalo Sorpresa',
      total: 119,
      savings: 28,
      badge: 'Mejor Ahorro'
    }
  };

  let selectedPromoId = 2; // Default to 2 units

  // --- ELEMENT SELECTORS ---
  const header = document.querySelector('header');
  
  // Showcase Slider
  const slidesContainer = document.querySelector('.slides');
  const slideElements = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dotsContainer = document.querySelector('.slider-dots');
  let currentSlide = 0;

  // Simulator
  const simPatch = document.getElementById('sim-patch');
  const simPartTitle = document.getElementById('sim-part-title');
  const simPartDesc = document.getElementById('sim-part-desc');
  const simModeTitle = document.getElementById('sim-mode-title');
  const simModeDesc = document.getElementById('sim-mode-desc');
  const simPartBtns = document.querySelectorAll('.sim-part-btn');
  const simModeBtns = document.querySelectorAll('.sim-mode-btn');

  // Checkout Promos (Buy Box Layout)
  const buyBoxOptions = document.querySelectorAll('.buybox-option');
  const buyBoxConfirmBtn = document.getElementById('buybox-confirm-btn');
  const checkoutPromoSelect = document.getElementById('checkout-promo-select');

  // Checkout Form
  const checkoutForm = document.getElementById('checkout-order-form');
  const checkoutNameInput = document.getElementById('checkout-name');
  const checkoutPhoneInput = document.getElementById('checkout-phone');
  const checkoutDeptSelect = document.getElementById('checkout-dept');
  const checkoutProvSelect = document.getElementById('checkout-prov');
  const checkoutDistSelect = document.getElementById('checkout-dist');
  const checkoutAddressInput = document.getElementById('checkout-address');
  const checkoutReferenceInput = document.getElementById('checkout-reference');

  // Order Summary elements
  const summaryPromoName = document.getElementById('summary-promo-name');
  const summaryPromoPrice = document.getElementById('summary-promo-price');
  const summaryDelivery = document.getElementById('summary-delivery');
  const summarySavings = document.getElementById('summary-savings');
  const summarySavingsRow = document.getElementById('summary-savings-row');
  const summaryTotal = document.getElementById('summary-total');

  // Modal
  const successModal = document.getElementById('success-modal');
  const modalPromo = document.getElementById('modal-promo');
  const modalPhone = document.getElementById('modal-phone');
  const modalAddress = document.getElementById('modal-address');
  const modalTotal = document.getElementById('modal-total');
  const whatsappConfirmBtn = document.getElementById('whatsapp-confirm-btn');

  // Reviews Elements
  const addReviewForm = document.getElementById('add-review-form');
  const formStars = document.querySelectorAll('#form-star-rating span');
  const reviewNameInput = document.getElementById('review-form-name');
  const reviewCityInput = document.getElementById('review-form-city');
  const reviewTextInput = document.getElementById('review-form-text');
  const reviewsListContainer = document.getElementById('reviews-list');
  let selectedReviewRating = 5; // Default 5 stars

  // --- HEADER SCROLL ACTION ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- SHOWCASE SLIDER LOGIC ---
  const totalSlides = slideElements.length;

  // Create dot indicators
  if (dotsContainer) {
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  const dots = document.querySelectorAll('.dot');

  function updateSlider() {
    if (slidesContainer) {
      slidesContainer.style.transform = `translateX(-${currentSlide * 33.333}%)`;
    }
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  // Auto slide every 6 seconds
  let autoSlideInterval = setInterval(nextSlide, 6000);

  const stopAutoSlide = () => clearInterval(autoSlideInterval);
  if (prevBtn) prevBtn.addEventListener('mouseenter', stopAutoSlide);
  if (nextBtn) nextBtn.addEventListener('mouseenter', stopAutoSlide);
  if (dotsContainer) dotsContainer.addEventListener('mouseenter', stopAutoSlide);

  // Touch Swipe for Mobile Slider
  let touchStartX = 0;
  let touchEndX = 0;

  if (slidesContainer) {
    slidesContainer.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoSlide();
    }, { passive: true });

    slidesContainer.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const threshold = 50;
    if (touchStartX - touchEndX > threshold) {
      nextSlide(); // Swiped left
    } else if (touchEndX - touchStartX > threshold) {
      prevSlide(); // Swiped right
    }
  }

  // --- SIMULATOR WIDGET LOGIC ---
  let activePart = 'neck';
  let activeMode = 1;

  function updateSimulator() {
    if (!simPatch) return;
    
    // 1. Update position classes
    simPatch.className = `massage-patch-simulation vibrating ${activePart}`;
    
    // 2. Adjust waves speed
    const speed = MASSAGE_MODES[activeMode].speed;
    simPatch.style.setProperty('--wave-duration', speed);
    
    // Force retrigger animation
    simPatch.classList.remove('vibrating');
    void simPatch.offsetWidth; // reflow
    simPatch.classList.add('vibrating');

    simPatch.style.animationDuration = speed;
    
    let styleTag = document.getElementById('dynamic-anim-speed');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'dynamic-anim-speed';
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = `
      .massage-patch-simulation.vibrating::after { animation-duration: ${speed} !important; }
      .massage-patch-simulation.vibrating::before { animation-duration: ${speed} !important; }
    `;

    // 3. Update texts
    if (simPartTitle) simPartTitle.textContent = BODY_PARTS[activePart].name;
    if (simPartDesc) simPartDesc.textContent = BODY_PARTS[activePart].desc;
    
    if (simModeTitle) simModeTitle.textContent = MASSAGE_MODES[activeMode].name;
    if (simModeDesc) simModeDesc.textContent = MASSAGE_MODES[activeMode].desc;

    // 4. Update button states
    simPartBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.part === activePart);
    });

    simModeBtns.forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.mode) === activeMode);
    });
  }

  simPartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activePart = btn.dataset.part;
      updateSimulator();
    });
  });

  simModeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeMode = parseInt(btn.dataset.mode);
      updateSimulator();
    });
  });

  // Init simulator
  updateSimulator();

  // --- PROMOTION & PRICE LOGIC (BUY BOX) ---
  function selectPromotion(id) {
    selectedPromoId = parseInt(id);
    
    // Update Buy Box Options selection
    buyBoxOptions.forEach(opt => {
      const optPromoId = parseInt(opt.dataset.promoId);
      opt.classList.toggle('selected', optPromoId === selectedPromoId);
    });

    // Update checkout select value
    if (checkoutPromoSelect) {
      checkoutPromoSelect.value = selectedPromoId;
    }

    // Update order summary
    const promo = PROMOTIONS[selectedPromoId];
    if (summaryPromoName) summaryPromoName.textContent = promo.name;
    if (summaryPromoPrice) summaryPromoPrice.textContent = `S/. ${promo.price.toFixed(2)}`;
    if (summaryDelivery) summaryDelivery.textContent = promo.delivery;
    
    if (summarySavingsRow) {
      if (promo.savings > 0) {
        summarySavingsRow.style.display = 'flex';
        if (summarySavings) summarySavings.textContent = `- S/. ${promo.savings.toFixed(2)}`;
      } else {
        summarySavingsRow.style.display = 'none';
      }
    }

    if (summaryTotal) summaryTotal.textContent = `S/. ${promo.total.toFixed(2)}`;
  }

  // Click on Buy Box option row
  buyBoxOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const id = opt.dataset.promoId;
      selectPromotion(id);
    });
  });

  // Confirm bundle selection & scroll to checkout
  if (buyBoxConfirmBtn) {
    buyBoxConfirmBtn.addEventListener('click', () => {
      const checkoutSection = document.getElementById('checkout');
      if (checkoutSection) {
        checkoutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Listen to checkout select list change
  if (checkoutPromoSelect) {
    checkoutPromoSelect.addEventListener('change', (e) => {
      selectPromotion(e.target.value);
    });
  }

  // Init default promo
  selectPromotion(selectedPromoId);

  // --- PERU UBIGEO LOGIC ---
  function initUbigeo() {
    if (typeof PERU_UBIGEO === 'undefined') {
      console.error('PERU_UBIGEO data is missing.');
      return;
    }

    const deptsSorted = Object.keys(PERU_UBIGEO).map(id => ({
      id,
      name: PERU_UBIGEO[id].name
    })).sort((a, b) => a.name.localeCompare(b.name));

    if (checkoutDeptSelect) {
      checkoutDeptSelect.innerHTML = '<option value="" disabled selected>Seleccione Departamento</option>';
      deptsSorted.forEach(dept => {
        const opt = document.createElement('option');
        opt.value = dept.id;
        opt.textContent = dept.name;
        checkoutDeptSelect.appendChild(opt);
      });
    }

    if (checkoutProvSelect) {
      checkoutProvSelect.disabled = true;
      checkoutProvSelect.innerHTML = '<option value="" disabled selected>Elige Departamento primero</option>';
    }
    if (checkoutDistSelect) {
      checkoutDistSelect.disabled = true;
      checkoutDistSelect.innerHTML = '<option value="" disabled selected>Elige Provincia primero</option>';
    }
  }

  if (checkoutDeptSelect) {
    checkoutDeptSelect.addEventListener('change', (e) => {
      const deptId = e.target.value;
      
      if (checkoutProvSelect) {
        checkoutProvSelect.innerHTML = '<option value="" disabled selected>Cargando provincias...</option>';
        checkoutProvSelect.disabled = false;
      }
      if (checkoutDistSelect) {
        checkoutDistSelect.innerHTML = '<option value="" disabled selected>Elige Provincia primero</option>';
        checkoutDistSelect.disabled = true;
      }

      setTimeout(() => {
        const deptData = PERU_UBIGEO[deptId];
        if (!deptData) return;

        const provsSorted = Object.keys(deptData.provinces).map(id => ({
          id,
          name: deptData.provinces[id].name
        })).sort((a, b) => a.name.localeCompare(b.name));

        if (checkoutProvSelect) {
          checkoutProvSelect.innerHTML = '<option value="" disabled selected>Seleccione Provincia</option>';
          provsSorted.forEach(prov => {
            const opt = document.createElement('option');
            opt.value = prov.id;
            opt.textContent = prov.name;
            checkoutProvSelect.appendChild(opt);
          });
        }
      }, 150);
    });
  }

  if (checkoutProvSelect) {
    checkoutProvSelect.addEventListener('change', (e) => {
      const deptId = checkoutDeptSelect.value;
      const provId = e.target.value;

      if (checkoutDistSelect) {
        checkoutDistSelect.innerHTML = '<option value="" disabled selected>Cargando distritos...</option>';
        checkoutDistSelect.disabled = false;
      }

      setTimeout(() => {
        const deptData = PERU_UBIGEO[deptId];
        if (!deptData) return;
        
        const provData = deptData.provinces[provId];
        if (!provData) return;

        const distsSorted = Object.keys(provData.districts).map(id => ({
          id,
          name: provData.districts[id]
        })).sort((a, b) => a.name.localeCompare(b.name));

        if (checkoutDistSelect) {
          checkoutDistSelect.innerHTML = '<option value="" disabled selected>Seleccione Distrito</option>';
          distsSorted.forEach(dist => {
            const opt = document.createElement('option');
            opt.value = dist.id;
            opt.textContent = dist.name;
            checkoutDistSelect.appendChild(opt);
          });
        }
      }, 150);
    });
  }

  initUbigeo();

  // --- ADD REVIEWS / COMMENTS LOGIC ---
  // Star rating selector click handler
  formStars.forEach(star => {
    star.addEventListener('click', () => {
      const val = parseInt(star.dataset.val);
      selectedReviewRating = val;
      
      // Update selected class
      formStars.forEach(s => {
        const sVal = parseInt(s.dataset.val);
        s.classList.toggle('selected', sVal <= val);
      });
    });
  });

  // Submit Review Form handler
  if (addReviewForm) {
    addReviewForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = reviewNameInput.value.trim();
      const city = reviewCityInput.value.trim();
      const text = reviewTextInput.value.trim();

      if (!name || !city || !text) {
        alert('Por favor, rellene todos los campos obligatorios para publicar su opinión.');
        return;
      }

      // Create new review element
      const card = document.createElement('div');
      card.className = 'review-card';
      
      // Create star representation
      let starsHtml = '';
      for (let i = 1; i <= 5; i++) {
        if (i <= selectedReviewRating) {
          starsHtml += '★';
        } else {
          starsHtml += '☆';
        }
      }

      card.innerHTML = `
        <div class="review-header">
          <div class="review-user-info">
            <span class="review-user-name">${name}</span>
            <span class="review-user-meta">${city} · <span class="verified-badge">✓ Compra verificada</span></span>
          </div>
          <div class="review-rating-row">
            <span style="color: var(--star-color); font-size: 0.95rem;">${starsHtml}</span>
            <span class="review-date">Hoy</span>
          </div>
        </div>
        <p class="review-text">${text}</p>
      `;

      // Insert at the beginning of list
      if (reviewsListContainer) {
        reviewsListContainer.insertBefore(card, reviewsListContainer.firstChild);
        
        // Scroll smoothly to the new comment
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Reset form
      addReviewForm.reset();
      selectedReviewRating = 5;
      formStars.forEach(s => s.classList.add('selected')); // reset stars to 5

      alert('¡Muchas gracias! Tu opinión ha sido publicada con éxito.');
    });
  }

  // --- FORM SUBMISSION (ORDER CHECKOUT) ---
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = checkoutNameInput.value.trim();
      const phone = checkoutPhoneInput.value.trim();
      const deptId = checkoutDeptSelect.value;
      const provId = checkoutProvSelect.value;
      const distId = checkoutDistSelect.value;
      const address = checkoutAddressInput.value.trim();
      const reference = checkoutReferenceInput.value.trim();

      if (!name || !phone || !deptId || !provId || !distId || !address) {
        alert('Por favor, rellene todos los campos obligatorios del formulario.');
        return;
      }

      if (!/^9\d{8}$/.test(phone)) {
        alert('Por favor, ingrese un número de celular de Perú válido (9 dígitos, comenzando con 9).');
        return;
      }

      const deptName = PERU_UBIGEO[deptId].name;
      const provName = PERU_UBIGEO[deptId].provinces[provId].name;
      const distName = PERU_UBIGEO[deptId].provinces[provId].districts[distId];

      const submitBtn = checkoutForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Procesando pedido... <i class="loader"></i></span>';

      setTimeout(() => {
        const promo = PROMOTIONS[selectedPromoId];
        
        if (modalPromo) modalPromo.textContent = promo.name;
        if (modalPhone) modalPhone.textContent = phone;
        if (modalAddress) modalAddress.textContent = `${address}, ${distName}, ${provName}, ${deptName}`;
        if (modalTotal) modalTotal.textContent = `S/. ${promo.total.toFixed(2)}`;

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        if (successModal) {
          successModal.classList.add('active');
        }

        // WhatsApp redirect setup
        const storePhone = '51900000000'; // Placeholder store owner WhatsApp number
        const textMessage = 
          `*NUEVO PEDIDO - LO BARATO SALE CARO*\n\n` +
          `📦 *Producto:* ${promo.name}\n` +
          `💰 *Total a pagar:* S/. ${promo.total.toFixed(2)} (Pago Contra Entrega)\n\n` +
          `👤 *Cliente:* ${name}\n` +
          `📞 *Celular:* ${phone}\n` +
          `📍 *Ubicación:* ${distName}, ${provName}, ${deptName}\n` +
          `🏠 *Dirección:* ${address}\n` +
          `🔔 *Referencia:* ${reference ? reference : 'Ninguna'}\n\n` +
          `¡Hola! Acabo de hacer mi pedido en la web y me gustaría confirmarlo.`;

        const encodedMessage = encodeURIComponent(textMessage);
        
        if (whatsappConfirmBtn) {
          whatsappConfirmBtn.onclick = () => {
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${storePhone}&text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
          };
        }
      }, 1000);
    });
  }

  // Close modal when clicking outside contents
  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }
});
