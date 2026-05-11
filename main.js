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

// ===================== CARRUSEL =====================
function moverCarrusel(carruselId, direccion) {
  const carrusel = document.getElementById(carruselId);
  const imgs = carrusel.querySelectorAll('.carrusel-img');
  const contador = document.getElementById('contador-' + carruselId);
  let actual = Array.from(imgs).findIndex(img => img.classList.contains('active'));

  imgs[actual].classList.remove('active');
  actual = (actual + direccion + imgs.length) % imgs.length;
  imgs[actual].classList.add('active');

  if (contador) contador.textContent = `${actual + 1} / ${imgs.length}`;
}

// ===================== MENÚ HAMBURGUESA (mobile) =====================
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  links.classList.toggle('abierto');
}

// Cerrar menú al hacer click en un link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('abierto');
  });
});

// ===================== MOBILE CONTROLS =====================
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('abierto');
}

function cerrarMenuMobile() {
  document.getElementById('mobile-menu').classList.remove('abierto');
}

// Sincronizar botones mobile con los de desktop
function toggleLangMobile() {
  setLang(currentLang === 'en' ? 'es' : 'en');
  // Sincronizar texto del botón mobile
  document.getElementById('lang-toggle-mobile').textContent =
    currentLang === 'en' ? 'ES' : 'EN';
}

function toggleDarkMobile() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  setDark(!isDark);
  document.getElementById('dark-toggle-mobile').textContent = !isDark ? '☀️' : '🌙';
}

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobile-menu');
  const hamburguesa = document.getElementById('hamburguesa');
  if (menu && !menu.contains(e.target) && !hamburguesa.contains(e.target)) {
    menu.classList.remove('abierto');
  }
});

// Sincronizar estado inicial de botones mobile con desktop
window.addEventListener('DOMContentLoaded', () => {
  const langMobile = document.getElementById('lang-toggle-mobile');
  const darkMobile = document.getElementById('dark-toggle-mobile');
  if (langMobile) langMobile.textContent = currentLang === 'en' ? 'ES' : 'EN';
  if (darkMobile) darkMobile.textContent =
    localStorage.getItem('theme') === 'dark' ? '☀️' : '🌙';
});
