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
      } else {
        // Remove animation class when element goes out of view
        const element = entry.target;
        element.classList.remove('in-view');
        element.style.animationDelay = '0s';
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

// Open image in lightbox when clicked
document.querySelectorAll('.gallery-image a').forEach(item => {
  item.addEventListener('click', function(e) {
    e.preventDefault();
    lightbox.style.display = 'block';
    lightboxImg.src = this.href;
  });
});

document.querySelectorAll('.image-item img').forEach(img => {
  img.addEventListener('click', function(e) {
    e.stopPropagation();
    console.log("Image clicked:", this.src); // TEST LINE
    lightbox.style.display = 'flex';
    lightboxImg.src = this.src;
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

  function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    // Generate floating dots
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      // Reverse direction when hitting the screen edge
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.fillStyle = 'rgba(204, 255, 0, 0.5)'; // Accent color #ccff00
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      // Draw connecting lines if particles are close
      for (let j = i + 1; j < particles.length; j++) {
        let dx = p.x - particles[j].x;
        let dy = p.y - particles[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(204, 255, 0, ${1 - dist/150})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    });
  }

  init();
  animate();

  // Resize canvas when window resizes
  window.addEventListener('resize', init);
});