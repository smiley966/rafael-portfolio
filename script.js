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
  let mouse = { x: -1000, y: -1000 };
  
  // Track mouse coordinates to light up the grid
  window.addEventListener('mousemove', (e) => {
     mouse.x = e.clientX;
     mouse.y = e.clientY;
  });

  // Remove highlight when mouse leaves the page
  window.addEventListener('mouseout', () => {
     mouse.x = -1000;
     mouse.y = -1000;
  });

  const hexRadius = 35;
  const hexWidth = Math.sqrt(3) * hexRadius;
  const hexHeight = 2 * hexRadius;
  const xOffset = hexWidth;
  const yOffset = hexHeight * 0.75;
  
  let hexagons = [];

  function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    hexagons = [];
    
    const cols = Math.ceil(width / xOffset) + 2;
    const rows = Math.ceil(height / yOffset) + 2;

    // Generate Hexagon Coordinates
    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const x = col * xOffset + (row % 2 !== 0 ? xOffset / 2 : 0);
        const y = row * yOffset;
        hexagons.push({ x, y, cx: x, cy: y });
      }
    }
  }

  function drawHexagon(x, y, radius, opacity) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const px = x + radius * Math.cos(angle);
      const py = y + radius * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.strokeStyle = `rgba(204, 255, 0, ${opacity})`; // Accent color
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);
    
    const time = Date.now() * 0.0005;

    hexagons.forEach(hex => {
      // Creates a subtle continuous breathing/moving grid effect
      const noise = Math.sin(time + hex.cx * 0.01) * Math.cos(time + hex.cy * 0.01);
      const dx = hex.cx + noise * 10;
      const dy = hex.cy + noise * 10;

      // Proximity to mouse controls glow and size
      const dist = Math.hypot(mouse.x - dx, mouse.y - dy);
      const maxDist = 250;
      
      let opacity = 0.02 + (Math.abs(noise) * 0.03); // Faint background base
      let radius = hexRadius * 0.5; // Base dormant size

      // If the mouse gets close, light up and expand the hexagon
      if (dist < maxDist) {
        const factor = 1 - (dist / maxDist);
        opacity += factor * 0.8;
        radius += factor * 12;
      }

      drawHexagon(dx, dy, radius, opacity);
    });
  }

  init();
  animate();

  // Resize canvas when window resizes
  window.addEventListener('resize', init);
});