// Mobile menu toggle with animation
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  const open = mobileMenu.style.display === 'flex';
  mobileMenu.style.display = open ? 'none' : 'flex';
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', (!open).toString());
});

// Contact form (demo only) with animation
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.classList.remove('sr-only');
  status.style.animation = 'fadeInUp 0.5s ease-out';
  status.textContent = 'Thanks! We will get back to you soon.';
  form.reset();
  setTimeout(() => { 
    status.style.animation = 'fadeIn 0.5s ease-out reverse';
    setTimeout(() => status.classList.add('sr-only'), 500);
  }, 4000);
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){
      e.preventDefault();
      const offsetTop = el.offsetTop - 80; // header offset
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      if(mobileMenu.style.display === 'flex'){
        mobileMenu.style.display = 'none';
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded','false');
      }
    }
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
  // Add fade-in-up to sections
  document.querySelectorAll('section').forEach((section, index) => {
    section.classList.add('fade-in-up');
    observer.observe(section);
  });

  // Add scale-in to cards
  document.querySelectorAll('.card').forEach((card, index) => {
    card.classList.add('scale-in');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Add slide animations to split layouts
  document.querySelectorAll('.split > div').forEach((div, index) => {
    if (index % 2 === 0) {
      div.classList.add('slide-in-left');
    } else {
      div.classList.add('slide-in-right');
    }
    observer.observe(div);
  });

  // Add fade-in to list items
  document.querySelectorAll('.list-item').forEach((item, index) => {
    item.classList.add('fade-in-up');
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
  });

  // Add animation to table rows
  document.querySelectorAll('table tbody tr').forEach((row, index) => {
    row.style.opacity = '0';
    row.style.transform = 'translateX(-20px)';
    row.style.transition = `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`;
    observer.observe(row);
    row.addEventListener('transitionend', () => {
      row.style.opacity = '1';
      row.style.transform = 'translateX(0)';
    });
  });
});

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      const value = Math.floor(current);
      if (target.toString().includes('+')) {
        element.textContent = value + '+';
      } else if (target.toString().includes('%')) {
        element.textContent = value + '%';
      } else {
        element.textContent = value;
      }
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.num');
      statNums.forEach(stat => {
        const text = stat.textContent;
        let target;
        if (text.includes('+')) {
          target = parseInt(text) + '+';
        } else if (text.includes('%')) {
          target = parseInt(text) + '%';
        } else {
          target = parseInt(text);
        }
        stat.textContent = '0';
        setTimeout(() => {
          animateCounter(stat, target, 2000);
        }, 200);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Parallax effect for hero image
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero img');
  if (heroImage && scrolled < window.innerHeight) {
    heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 100) {
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    header.style.background = 'rgba(255,255,255,0.98)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0,0,0,.04)';
    header.style.background = 'rgba(255,255,255,0.95)';
  }
  lastScroll = currentScroll;
});

// Add ripple effect to buttons
document.querySelectorAll('.btn, .cta').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  .btn, .cta {
    position: relative;
    overflow: hidden;
  }
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  table tbody tr {
    opacity: 0;
    transform: translateX(-20px);
  }
  table tbody tr.visible {
    opacity: 1;
    transform: translateX(0);
  }
`;
document.head.appendChild(style);

// Smooth reveal for table rows
const tableObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('table tbody tr').forEach(row => {
  tableObserver.observe(row);
});
