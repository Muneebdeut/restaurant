import { useEffect, useRef } from "react";

export default function ThreeDBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking
    let mouseX = width / 2;
    let mouseY = height / 2;
    let smoothMouseX = width / 2;
    let smoothMouseY = height / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Particle variables
    const particleCount = 75;
    const fov = 400;
    const cameraZ = 300;
    
    // Warm culinary colors: copper, orange, gold, yellow-white, fire red
    const colors = [
      "rgba(230, 95, 44",   // Terracotta orange
      "rgba(234, 179, 8",   // Gold
      "rgba(239, 68, 68",   // Flame red
      "rgba(253, 251, 247",  // Warm cream
    ];

    const createParticle = (initY = false) => {
      const depth = Math.random() * 400 - 200; // z depth
      return {
        // x coordinate mapped in 3D
        x: Math.random() * (width + 400) - (width / 2 + 200),
        // y coordinate starts at bottom or randomized initially
        y: initY ? Math.random() * (height + 200) - 100 : height / 2 + 200,
        z: depth,
        vx: Math.random() * 0.4 - 0.2,
        vy: -(Math.random() * 1.5 + 0.8), // rising speed
        size: Math.random() * 2.5 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.008,
        swayWidth: Math.random() * 0.8 + 0.3,
        life: 1.0,
        decay: Math.random() * 0.005 + 0.002,
      };
    };

    const particles = Array.from({ length: particleCount }, () => createParticle(true));

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.05;

      // Smooth mouse interpolation
      smoothMouseX += (mouseX - smoothMouseX) * 0.05;
      smoothMouseY += (mouseY - smoothMouseY) * 0.05;

      // Parallax rotation angles based on mouse
      const angleY = ((smoothMouseX - width / 2) / width) * 0.15;
      const angleX = -((smoothMouseY - height / 2) / height) * 0.15;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Enable additive blending for glowing sparks
      ctx.globalCompositeOperation = "screen";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Physics update
        p.y += p.vy;
        p.x += p.vx + Math.sin(time * p.swaySpeed + p.phase) * p.swayWidth;
        p.life -= p.decay;

        // 3D coordinates relative to scene
        // Rotate around X-axis
        let y1 = p.y * cosX - p.z * sinX;
        let z1 = p.z * cosX + p.y * sinX;

        // Rotate around Y-axis
        let x2 = p.x * cosY - z1 * sinY;
        let z2 = z1 * cosY + p.x * sinY;

        const depth = z2 + cameraZ;

        // Reset particle if off top of viewport or out of life
        if (depth < 20 || p.life <= 0 || y1 < -height) {
          particles[i] = createParticle(false);
          continue;
        }

        // Apply perspective projection
        const scale = fov / depth;
        const px = width / 2 + x2 * scale;
        const py = height / 2 + y1 * scale;

        // Gentle draft force: push particles away from cursor
        const dx = px - smoothMouseX;
        const dy = py - smoothMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.x += (dx / dist) * force * 1.5;
        }

        // Draw particle only if visible on screen
        if (px >= -20 && px <= width + 20 && py >= -20 && py <= height + 20) {
          const size = Math.max(0.5, p.size * scale * p.life);
          
          // Calculate opacity based on life and distance from bottom
          const alpha = p.life * Math.min(1.0, (height - py) / 200);

          // Glowing Ember Radial Gradient
          const grad = ctx.createRadialGradient(px, py, 0, px, py, size * 2.5);
          grad.addColorStop(0, `${p.color}, ${alpha})`);
          grad.addColorStop(0.3, `${p.color}, ${alpha * 0.4})`);
          grad.addColorStop(1, `${p.color}, 0)`);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(px, py, size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Reset composite operation to default
      ctx.globalCompositeOperation = "source-over";

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
