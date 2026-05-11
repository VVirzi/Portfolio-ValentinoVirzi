// ===================== NAVEGACIÓN SUAVE =====================
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ===================== NAVBAR: sección activa =====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('activo');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('activo');
  });
});

// ===================== DARK MODE =====================
const darkBtn = document.getElementById('dark-toggle');

function setDark(on) {
  document.documentElement.setAttribute('data-theme', on ? 'dark' : 'light');
  darkBtn.textContent = on ? '☀️' : '🌙';
  localStorage.setItem('theme', on ? 'dark' : 'light');
}

// Default siempre claro — solo oscuro si el usuario lo guardó explícitamente
const savedTheme = localStorage.getItem('theme');
setDark(savedTheme === 'dark');

darkBtn.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  setDark(!isDark);
});

// ===================== IDIOMA =====================
const langBtn = document.getElementById('lang-toggle');
let currentLang = localStorage.getItem('lang') || 'en';

function traducirElementos(contenedor) {
  const scope = contenedor || document;
  scope.querySelectorAll('[data-en]').forEach(el => {
    const text = currentLang === 'en'
      ? el.getAttribute('data-en')
      : el.getAttribute('data-es');
    if (text) el.innerHTML = text;
  });
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.setAttribute('lang', lang);
  langBtn.textContent = lang === 'en' ? 'ES' : 'EN';
  traducirElementos();
}

setLang(currentLang);

langBtn.addEventListener('click', () => {
  setLang(currentLang === 'en' ? 'es' : 'en');
});

// ===================== MODALES =====================
function abrirModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('activo');
    document.body.style.overflow = 'hidden';
    // Traducir el contenido del modal al idioma actual al abrirlo
    traducirElementos(modal);
  }
}

function cerrarModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('activo');
    document.body.style.overflow = '';
  }
}

function cerrarModalFuera(event, id) {
  if (event.target === document.getElementById(id)) cerrarModal(id);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.activo').forEach(modal => {
      modal.classList.remove('activo');
    });
    document.body.style.overflow = '';
  }
});

// ===================== ANIMACIONES DE ENTRADA =====================
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll([
  '.hero-content',
  '.hero-foto-wrap',
  '.section-title',
  '.sobre-texto',
  '.sobre-datos',
  '.skill-group',
  '.timeline-item',
  '.edu-item',
  '.proyecto-card',
  '.contacto-texto',
  '.contacto-links',
  '.dato'
].join(',')).forEach(el => {
  el.classList.add('anim');
  observer.observe(el);
});

// Animación escalonada para grillas
document.querySelectorAll('.proyecto-card, .skill-group').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
});