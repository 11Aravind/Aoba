/**
 * AOBA Ambient Botanical & Spice Particle Simulation
 * Renders floating peppercorns, golden turmeric dust, and Kerala tea/spice leaves
 */

export function initAmbientCanvas(canvasId = 'ambient-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouseX = width / 2;
  let mouseY = height / 2;

  // Particle pool
  const particles = [];
  const particleCount = window.innerWidth < 768 ? 25 : 55;

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.size = Math.random() * 4 + 1.5;
      this.speedY = Math.random() * 0.4 + 0.15;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      this.alpha = Math.random() * 0.45 + 0.1;
      this.type = Math.random() > 0.4 ? 'gold-dust' : Math.random() > 0.3 ? 'peppercorn' : 'leaf';
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotationSpeed;

      // Gentle mouse interaction
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        this.x -= (dx / dist) * 0.8;
        this.y -= (dy / dist) * 0.8;
      }

      if (this.y < -30 || this.x < -30 || this.x > width + 30) {
        this.reset(false);
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.alpha;

      if (this.type === 'gold-dust') {
        // Golden glowing specks (turmeric motes)
        ctx.fillStyle = '#dfb56c';
        ctx.shadowColor = '#cba258';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.type === 'peppercorn') {
        // Dark textured peppercorn silhouette
        ctx.fillStyle = '#0a1a12';
        ctx.strokeStyle = 'rgba(203, 162, 88, 0.4)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 1.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else {
        // Subtle stylized leaf silhouette
        ctx.fillStyle = '#2c6348';
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 2);
        ctx.quadraticCurveTo(this.size * 1.8, 0, 0, this.size * 2);
        ctx.quadraticCurveTo(-this.size * 1.8, 0, 0, -this.size * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function handleResize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  window.addEventListener('resize', handleResize, { passive: true });
  window.addEventListener('mousemove', handleMouseMove, { passive: true });

  let animationFrameId;
  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(ctx);
    }
    animationFrameId = requestAnimationFrame(animate);
  }

  animate();

  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('mousemove', handleMouseMove);
  };
}
