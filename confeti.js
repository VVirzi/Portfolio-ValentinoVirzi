// ===================== CONFETI =====================
// Lanza confeti desde el centro inferior de la pantalla.
// Se dispara al descargar el CV y al copiar el email.

const CONFETI_COLORES = ['#0a6453', '#12a07e', '#1ac99e', '#084d3e', '#c8a040', '#e3c77a'];
const CONFETI_GRAVEDAD = 0.32;
const CONFETI_FRICCION = 0.99;

function lanzarConfeti() {
  // Respetar a quienes desactivan las animaciones en su sistema
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const ancho = window.innerWidth;
  const alto = window.innerHeight;

  canvas.width = ancho * dpr;
  canvas.height = alto * dpr;
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999';
  ctx.scale(dpr, dpr);
  document.body.appendChild(canvas);

  // Menos partículas en celular para que vaya fluido
  const cantidad = ancho < 600 ? 90 : 160;
  const particulas = [];

  for (let i = 0; i < cantidad; i++) {
    // Cono hacia arriba de unos 70 grados
    const angulo = (-90 + (Math.random() - 0.5) * 70) * (Math.PI / 180);
    // Velocidad para llegar entre el 50% y el 90% de la altura de la pantalla
    const alturaObjetivo = alto * (0.5 + Math.random() * 0.4);
    const velocidad = Math.sqrt(2 * CONFETI_GRAVEDAD * alturaObjetivo) * 1.1;

    particulas.push({
      x: ancho / 2 + (Math.random() - 0.5) * 40,
      y: alto + 10,
      vx: Math.cos(angulo) * velocidad,
      vy: Math.sin(angulo) * velocidad,
      w: 6 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      color: CONFETI_COLORES[Math.floor(Math.random() * CONFETI_COLORES.length)],
      rot: Math.random() * Math.PI * 2,
      vrot: (Math.random() - 0.5) * 0.3,
      fase: Math.random() * Math.PI * 2,
      circulo: Math.random() < 0.3
    });
  }

  let ultimo = performance.now();
  const inicio = ultimo;

  function dibujar(ahora) {
    // dt normaliza la velocidad para pantallas de 60, 120 o 144 Hz
    const dt = Math.min((ahora - ultimo) / 16.67, 3);
    ultimo = ahora;
    ctx.clearRect(0, 0, ancho, alto);

    let enPantalla = 0;

    for (const p of particulas) {
      p.vx *= Math.pow(CONFETI_FRICCION, dt);
      p.vy = p.vy * Math.pow(CONFETI_FRICCION, dt) + CONFETI_GRAVEDAD * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vrot * dt;
      p.fase += 0.12 * dt;

      if (p.y < alto + 40) enPantalla++;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;

      if (p.circulo) {
        ctx.beginPath();
        ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // El coseno simula que el papelito gira en el aire
        const altoVisible = p.h * Math.abs(Math.cos(p.fase));
        ctx.fillRect(-p.w / 2, -altoVisible / 2, p.w, altoVisible);
      }

      ctx.restore();
    }

    // Termina cuando todo cayó o como máximo a los 6 segundos
    if (enPantalla > 0 && ahora - inicio < 6000) {
      requestAnimationFrame(dibujar);
    } else {
      canvas.remove();
    }
  }

  requestAnimationFrame(dibujar);
}

// ===================== DISPARADORES =====================
// Botones de descarga del CV (hero y contacto)
document.querySelectorAll('a[download]').forEach(boton => {
  boton.addEventListener('click', lanzarConfeti);
});

// Botón de copiar email del modal
const botonCopiar = document.getElementById('copy-btn');
if (botonCopiar) botonCopiar.addEventListener('click', lanzarConfeti);
