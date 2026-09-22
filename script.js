/* =====================================================
   NADÈ¯GE BARREAU — Interactions et animations
   Fluidité¬°, accessibilitç¬° et expç¬°rience utilisateur
   ===================================================== */

// Menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Fermer le menu au clic sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = current;
}, { passive: true });

// Onglets pratiques
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // Dç¬°sactiver tous les onglets
    document.querySelectorAll('.tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.practice-panel').forEach(p => {
      p.classList.remove('active');
    });
    
    // Activer l'onglet cliquç¬°
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const target = document.getElementById(tab.dataset.tab);
    target?.classList.add('active');
  });
});

// Formulaire de contact
function sendForm(event) {
  event.preventDefault();
  const form = event.target;
  
  const subject = encodeURIComponent('Demande de contact – site Nadè¯¯ge Barreau');
  const body = encodeURIComponent(
    `Nom : ${form.name.value}\n` +
    `Tç¬°lç¬°phone : ${form.phone.value}\n` +
    `E-mail : ${form.email.value}\n` +
    `Disponibilitç¬°s : ${form.availability.value}\n\n` +
    `Message :\n${form.message.value}`
  );
  
  window.location.href = `mailto:barreau.nadege31@orange.fr?subject=${subject}&body=${body}`;
  
  const result = document.getElementById('form-result');
  if (result) {
    result.textContent = 'Votre application e-mail va s\'ouvrir pour envoyer votre message.';
    result.style.color = '#2d5a4a';
    result.style.fontWeight = '600';
  }
  
  form.reset();
}

// Animation au scroll (Intersection Observer)
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.12
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.length > 1 && href !== '#') {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Gestion de la modale des mentions lç¬°gales
const modal = document.querySelector('#mentions');
const modalClose = document.querySelector('.modal-close');
const modalLink = document.querySelector('a[href="#mentions"]');

// Ouvrir la modale
modalLink?.addEventListener('click', (e) => {
  e.preventDefault();
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Empç¬™che le scroll
  }
});

// Fermer la modale avec la croix
modalClose?.addEventListener('click', (e) => {
  e.preventDefault();
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
});

// Fermer la modale en cliquant en dehors
modal?.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
});

// Fermer avec la touche Échap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Fermer le menu mobile
    navLinks.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    
    // Fermer la modale
    if (modal && modal.style.display === 'flex') {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
});

// Effet de parallaxe lç¬°ger sur le hero
const heroVisual = document.querySelector('.hero-visual');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (heroVisual && scrolled < window.innerHeight) {
    heroVisual.style.transform = `translateY(${scrolled * 0.08}px)`;
  }
}, { passive: true });

// Accessibilitç¬° clavier
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

// Prç¬°charger les polices
if ('fonts' in document) {
  document.fonts.ready.then(() => {
    document.body.classList.add('fonts-loaded');
  });
}

// Console de dç¬°bogage
console.log('Site Nadè¯¯ge Barreau — MTC chargç¬° avec succè¯¯s ☯');