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

// ===================== MODALES =====================
function abrirModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('activo');
    document.body.style.overflow = 'hidden';
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

// ===================== DARK MODE =====================
const darkBtn = document.getElementById('dark-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setDark(on) {
  document.documentElement.setAttribute('data-theme', on ? 'dark' : 'light');
  darkBtn.textContent = on ? '☀️' : '🌙';
  localStorage.setItem('theme', on ? 'dark' : 'light');
}

// Cargar preferencia guardada (o del sistema si no hay)
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setDark(savedTheme === 'dark');
} else {
  setDark(prefersDark.matches);
}

darkBtn.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  setDark(!isDark);
});

// ===================== IDIOMA =====================
const langBtn = document.getElementById('lang-toggle');
let currentLang = localStorage.getItem('lang') || 'en';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.setAttribute('lang', lang);
  langBtn.textContent = lang === 'en' ? 'ES' : 'EN';

  // Traducir todos los elementos con data-en / data-es
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-es');
    if (text) el.innerHTML = text;
  });
}

// Aplicar idioma al cargar
setLang(currentLang);

langBtn.addEventListener('click', () => {
  setLang(currentLang === 'en' ? 'es' : 'en');
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

// Elementos que se animan al entrar en viewport
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
