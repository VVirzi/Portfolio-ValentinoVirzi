// ===================== NAVEGACIÓN SUAVE =====================
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ===================== NAVBAR: resaltar sección activa =====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('activo');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('activo');
    }
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
  // Cierra si se hace click en el fondo oscuro (no en la caja)
  if (event.target === document.getElementById(id)) {
    cerrarModal(id);
  }
}

// Cerrar modales con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.activo').forEach(modal => {
      modal.classList.remove('activo');
    });
    document.body.style.overflow = '';
  }
});
