// Premium Neo-Glow Portfolio Interactivity

document.addEventListener('DOMContentLoaded', () => {
  // 1. Custom Cursor Tracking
  const cursor = document.getElementById('custom-cursor');
  
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });

    const hoverables = document.querySelectorAll('a, button, input, textarea, .skill-card, .project-card, .nav-logo');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });
  }

  // 2. Navbar Scrolling Effects
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('shadow');
    } else {
      navbar.classList.remove('shadow');
    }
    
    // Auto-highlight active navigation item
    highlightNavOnScroll();
  });

  // 3. Smooth Navigation Scroll
  window.scrollToSection = function (id) {
    const section = document.getElementById(id);
    if (section) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const sectionRect = section.getBoundingClientRect().top;
      const sectionPosition = sectionRect - bodyRect;
      const offsetPosition = sectionPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      closeMenu();
    }
  };

  // 4. Mobile Menu Controls
  const mobileMenu = document.getElementById('mobile-menu');
  
  window.openMenu = function () {
    if (mobileMenu) mobileMenu.classList.add('open');
  };
  
  window.closeMenu = function () {
    if (mobileMenu) mobileMenu.classList.remove('open');
  };

  // 5. Typing Animation (Hero Headline)
  const phrases = [
    'Sanjay A',
    'a Cyber Security Student',
    'an Ethical Hacker',
    'a Penetration Tester',
    'a Vulnerability Analyst'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const typedTextSpan = document.getElementById('typed-text');
  const typingDelay = 100;
  const erasingDelay = 50;
  const newPhraseDelay = 2000; // delay between phrases

  function type() {
    if (!typedTextSpan) return;
    
    const currentPhrase = phrases[phraseIndex];
    
    if (deleting) {
      typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!deleting && charIndex === currentPhrase.length) {
      deleting = true;
      setTimeout(type, newPhraseDelay);
    } else if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, deleting ? erasingDelay : typingDelay);
    }
  }

  // Start typing animation
  if (typedTextSpan) {
    setTimeout(type, 1000);
  }

  // 6. Skill Grid Filter System
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from other tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterVal === 'all' || categories.includes(filterVal)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 7. Intersection Observer for Scroll Animations
  const animElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once animation is loaded
        animObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animElements.forEach(el => animObserver.observe(el));

  // Trigger hero content immediately
  const heroAnims = document.querySelectorAll('#home .fade-in, #home .slide-in-left, #home .slide-in-right');
  heroAnims.forEach(el => {
    setTimeout(() => {
      el.classList.add('active');
    }, 200);
  });

  // 8. Dynamic Scroll Highlight for Navigation Items
  const navSections = document.querySelectorAll('section');
  const navButtons = document.querySelectorAll('.nav-links button, .mobile-menu button');

  function highlightNavOnScroll() {
    let scrollPos = window.scrollY + 150; // offset for detection
    
    navSections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        navButtons.forEach(btn => {
          btn.style.color = '';
          const onClickAttr = btn.getAttribute('onclick');
          if (onClickAttr && onClickAttr.includes(`'${id}'`)) {
            btn.style.color = 'var(--color-accent-1)';
          }
        });
      }
    });
  }

  // 9. Interactive Contact Form Handler
  const contactForm = document.getElementById('portfolio-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = 'Sending... <svg viewBox="0 0 24 24" style="width:18px;height:18px;animation:spin 1s linear infinite;fill:currentColor"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      // Simulate API submit delay
      setTimeout(() => {
        submitBtn.innerHTML = 'Message Sent! ✓';
        submitBtn.style.background = 'var(--grad-secondary)';
        submitBtn.style.color = '#fff';
        submitBtn.style.boxShadow = '0 0 20px rgba(225, 0, 255, 0.4)';
        
        // Reset form fields
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.style.boxShadow = '';
          submitBtn.style.opacity = '';
        }, 3000);
      }, 1500);
    });
  }
});

// CSS Spin keyframes injection for loading indicator
const styleElement = document.createElement('style');
styleElement.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleElement);
