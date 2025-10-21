'use strict';

// ========================================
// 1. АНИМАЦИЯ БУРГЕР-МЕНЮ (уже есть базовая версия)
// ========================================
const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

navToggler.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

// ========================================
// 2. ПЛАВНОЕ ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Применяем к service cards, work cards, about items
document.querySelectorAll('.service-card, .work-card, .about-item').forEach(el => {
  el.classList.add('animate-on-scroll');
  observer.observe(el);
});

// ========================================
// 3. АНИМИРОВАННЫЙ СЧЕТЧИК ЧИСЕЛ
// ========================================
const counters = document.querySelectorAll('.strong');
let counterAnimated = false;

const animateCounters = () => {
  counters.forEach(counter => {
    const text = counter.textContent;
    const match = text.match(/(\d+)/);
    
    if (match) {
      const target = parseInt(match[1]);
      const suffix = text.replace(/\d+/, '');
      let current = 0;
      const increment = target / 50;
      const duration = 2000;
      const stepTime = duration / 50;
      
      counter.textContent = '0' + suffix;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.ceil(current) + suffix;
          setTimeout(updateCounter, stepTime);
        } else {
          counter.textContent = target + suffix;
        }
      };
      
      updateCounter();
    }
  });
};

const aboutSection = document.querySelector('.about');
if (aboutSection) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counterAnimated) {
        counterAnimated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.3 });
  
  counterObserver.observe(aboutSection);
}

// ========================================
// 4. ПРЕЛОАДЕР
// ========================================
window.addEventListener('load', () => {
  const preloader = document.createElement('div');
  preloader.className = 'preloader';
  preloader.innerHTML = `
    <div class="preloader-inner">
      <div class="spinner"></div>
    </div>
  `;
  
  document.body.prepend(preloader);
  
  setTimeout(() => {
    preloader.classList.add('fade-out');
    setTimeout(() => preloader.remove(), 500);
  }, 1000);
});

// ========================================
// 5. RIPPLE ЭФФЕКТ НА КНОПКАХ
// ========================================
const buttons = document.querySelectorAll('.btn, .btn-link, .card-btn');

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// ========================================
// 6. STICKY HEADER С ИЗМЕНЕНИЕМ РАЗМЕРА
// ========================================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  if (currentScroll > lastScroll && currentScroll > 200) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }
  
  lastScroll = currentScroll;
});

// ========================================
// 7. ПАРАЛЛАКС ЭФФЕКТ ДЛЯ HERO СЕКЦИИ
// ========================================
const heroBanner = document.querySelector('.hero-banner img');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  if (heroBanner && scrolled < 1000) {
    heroBanner.style.transform = `translateY(${scrolled * 0.4}px)`;
  }
});

// ========================================
// 8. 3D ЭФФЕКТ НАКЛОНА ДЛЯ КАРТОЧЕК
// ========================================
const cards = document.querySelectorAll('.service-card, .work-card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
});

// ========================================
// 9. ПРОГРЕСС БАР СКРОЛЛА
// ========================================
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.pageYOffset / windowHeight) * 100;
  progressBar.style.width = scrolled + '%';
});

// ========================================
// 10. ЭФФЕКТ ПЕЧАТАЮЩЕЙСЯ МАШИНКИ ДЛЯ ЗАГОЛОВКА
// ========================================
const heroTitle = document.querySelector('.hero .h1');
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  heroTitle.style.opacity = '1';
  
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 80);
    }
  };
  
  setTimeout(typeWriter, 500);
}

// ========================================
// ДОПОЛНИТЕЛЬНО: Плавная прокрутка к якорям
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Закрываем мобильное меню после клика
      if (navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        navToggler.classList.remove('active');
      }
    }
  });
});