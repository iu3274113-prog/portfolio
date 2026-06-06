// Theme Toggle
function toggleTheme() {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
}

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light');
  }
});

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    const formStatus = document.getElementById('formStatus');
    
    // Validation
    if (!name || !email || !subject || !message) {
      formStatus.textContent = '❌ Please fill all fields';
      formStatus.classList.remove('success');
      formStatus.classList.add('error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formStatus.textContent = '❌ Please enter a valid email';
      formStatus.classList.remove('success');
      formStatus.classList.add('error');
      return;
    }
    
    // Simulate form submission
    formStatus.textContent = '📤 Sending...';
    formStatus.classList.remove('error');
    
    setTimeout(() => {
      formStatus.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
      formStatus.classList.add('success');
      formStatus.classList.remove('error');
      contactForm.reset();
      
      // Clear message after 5 seconds
      setTimeout(() => {
        formStatus.textContent = '';
      }, 5000);
    }, 1000);
  });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Animate stats on scroll
const animateStats = () => {
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    if (stat.textContent) {
      const finalValue = stat.textContent;
      const numValue = parseInt(finalValue);
      
      if (!isNaN(numValue)) {
        let currentValue = 0;
        const increment = Math.ceil(numValue / 30);
        
        const counter = setInterval(() => {
          currentValue += increment;
          if (currentValue >= numValue) {
            stat.textContent = finalValue;
            clearInterval(counter);
          } else {
            stat.textContent = currentValue + '+';
          }
        }, 50);
      }
    }
  });
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      entry.target.classList.add('animated');
      animateStats();
      statsObserver.unobserve(entry.target);
    }
  });
});

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  statsObserver.observe(heroStats);
}

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'slideDown 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card').forEach(el => {
  el.style.opacity = '0';
  el.style.animation = 'slideDown 0.6s ease forwards';
  observer.observe(el);
});