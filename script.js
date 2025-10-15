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