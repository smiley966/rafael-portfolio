//SCROLL ANIMATION
document.addEventListener('DOMContentLoaded', function () {
  // Select all elements with the 'animate' class (for text and other elements)
  const animatedElements = document.querySelectorAll('.animate');

  // Function to handle the animation when the element is in view
  const handleAnimation = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation class when element comes into view
        const element = entry.target;
        element.classList.add('in-view');

        // Set animation delay (optional based on custom data attribute)
        const delay = element.getAttribute('data-animate-delay') || '0s';
        element.style.animationDelay = delay;
      }
    });
  };

  // Create an intersection observer for animated elements
  const observer = new IntersectionObserver(handleAnimation, {
    threshold: 0.5, // Trigger when 50% of the element is in view
  });

  // Observe each element for text and other animations
  animatedElements.forEach(element => {
    observer.observe(element);
  });
});

//CLICK IMAGE
// Get elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');

if (lightbox && lightboxImg && closeBtn) {
  // Open image in lightbox when clicked
  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const img = this.querySelector('img');
      if (img) {
        lightbox.style.display = 'flex';
        lightbox.style.justifyContent = 'center';
        lightbox.style.alignItems = 'center';
        lightboxImg.src = img.src;
      }
    });
  });

  // Close lightbox when X is clicked
  closeBtn.onclick = function() {
    lightbox.style.display = 'none';
  }

  // Close lightbox when clicking outside the image
  lightbox.onclick = function(e) {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  }
}

//DESCRIPTIONS
function toggleDesc(img) {
  const item = img.parentElement;
  item.classList.toggle("active");
}

// MOVING BACKGROUND EFFECT
document.addEventListener("DOMContentLoaded", function() {
  // Dynamically inject the canvas so you don't need to edit index.html
  const canvas = document.createElement('canvas');
  canvas.id = 'moving-bg';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  let mouse = { x: -1000, y: -1000 };
  let time = 0;

  // Determine which page we are currently on
  let pageType = 'home';
  if (document.getElementById('about')) pageType = 'about';
  else if (document.getElementById('projects')) pageType = 'projects';
  else if (document.getElementById('contact')) pageType = 'contact';

  // Track mouse for interactive effects
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    
    if (pageType === 'home') {
      const numParticles = Math.floor((width * height) / 6000);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width, y: Math.random() * height,
          radius: Math.random() * 3 + 1,
          vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 1) * 0.5 - 0.2,
          baseAlpha: Math.random() * 0.5 + 0.2,
          color: Math.random() > 0.5 ? '94, 33, 55' : '173, 46, 74',
          pulseSpeed: Math.random() * 0.05 + 0.01,
          angle: Math.random() * Math.PI * 2
        });
      }
    } else if (pageType === 'about') {
      const numParticles = Math.floor((width * height) / 8000);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width, y: Math.random() * height,
          radius: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 0.8, vy: (Math.random() - 0.5) * 0.8,
          alpha: Math.random() * 0.8 + 0.2
        });
      }
    } else if (pageType === 'projects') {
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * width, y: Math.random() * height,
          size: Math.random() * 15 + 5,
          vx: (Math.random() - 0.5) * 1, vy: (Math.random() - 0.5) * 1,
          angle: Math.random() * Math.PI * 2,
          vAngle: (Math.random() - 0.5) * 0.02
        });
      }
    } else if (pageType === 'contact') {
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: Math.random() * width, y: Math.random() * height,
          r: Math.random() * 150 + 50,
          vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
          color: Math.random() > 0.5 ? '94, 33, 55' : '119, 182, 172'
        });
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);
    time += 0.02;

    if (pageType === 'home') {
      // Home: Floating Interactive Embers
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.angle += p.pulseSpeed;
        
        let dx = mouse.x - p.x, dy = mouse.y - p.y;
        let dist = Math.hypot(dx, dy);
        if (dist < 120) {
          let force = (120 - dist) / 120;
          p.x -= (dx / dist) * force * 2; p.y -= (dy / dist) * force * 2;
        }
        
        if (p.x < 0) p.x = width; if (p.x > width) p.x = 0;
        if (p.y < -10) p.y = height + 10; if (p.y > height + 10) p.y = -10;

        const alpha = p.baseAlpha + Math.sin(p.angle) * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0.1, alpha)})`;
        ctx.shadowBlur = p.radius * 2;
        ctx.shadowColor = `rgba(${p.color}, ${Math.max(0.1, alpha)})`;
        ctx.fill();
      });
      ctx.shadowBlur = 0;
    } 
    else if (pageType === 'about') {
      // About: Neural Network Constellation
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          let p1 = particles[i], p2 = particles[j];
          let dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(173, 46, 74, ${(1 - dist / 120) * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(94, 33, 55, ${p.alpha})`;
        ctx.fill();
      });
    } 
    else if (pageType === 'projects') {
      // Projects: Floating Triangles
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.angle += p.vAngle;
        if (p.x < -p.size) p.x = width + p.size; if (p.x > width + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = height + p.size; if (p.y > height + p.size) p.y = -p.size;
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.moveTo(0, -p.size); ctx.lineTo(p.size, p.size); ctx.lineTo(-p.size, p.size);
        ctx.closePath();
        ctx.strokeStyle = 'rgba(94, 33, 55, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      });
    } 
    else if (pageType === 'contact') {
      // Contact: Floating Ambient Orbs
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -p.r) p.x = width + p.r;
        if (p.x > width + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = height + p.r;
        if (p.y > height + p.r) p.y = -p.r;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, 0.03)`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${p.color}, 0.1)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    }
  }

  init();
  animate();

  // Resize canvas when window resizes
  window.addEventListener('resize', init);
});

// IMAGE AUTO CYCLER
document.addEventListener('DOMContentLoaded', () => {
  const profileImg = document.querySelector('.profile-container img');
  
  if (profileImg) {
    // Auto-cycle through the specified sequence
    const images = ['images/PIC1.jpg', 'images/PIC4.jpg', 'images/PIC3.jpg', 'images/PIC6.jpg'];
    let currentIndex = 0;

    // Preload images to prevent flickering the first time it loads
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
    
    // Automatically change the image every 2 seconds (2000 milliseconds)
    setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      profileImg.src = images[currentIndex];
    }, 2000);
  }
});