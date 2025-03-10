// Scroll Progress Indicator
function updateScrollProgress() {
  const scrollProgress = document.querySelector('.scroll-progress');
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  const progressWidth = `${(scrolled / scrollable) * 100}%`;
  scrollProgress.style.width = progressWidth;
}

// Smooth Scroll for Navigation
function smoothScroll(target) {
  const element = document.querySelector(target);
  window.scrollTo({
    top: element.offsetTop,
    behavior: 'smooth'
  });
}

// Tabs Functionality
function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked tab
      tab.classList.add('active');
      const targetContent = document.getElementById(tab.dataset.tab);
      targetContent.classList.add('active');
    });
  });
}

// Expandable Conditions
function initExpandableItems() {
  const conditionItems = document.querySelectorAll('.condition-item');
  
  conditionItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });
}

// Reveal Animation on Scroll
function initRevealOnScroll() {
  const revealElements = document.querySelectorAll('.fade-in');
  
  const revealOnScroll = () => {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check
}

// Form Submission
function initContactForm() {
  const form = document.getElementById('proposalForm');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    form.reset();
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menuItems = document.querySelector('.menu-items');
  
  if (menuToggle && menuItems) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      menuItems.classList.toggle('active');
    });
  }
}

// Animação de elementos ao rolar
function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-in');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    
    if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
      element.classList.add('visible');
    }
  });
}

// Animação para os cards de condições
function initConditionCards() {
  const cards = document.querySelectorAll('.condition-card');
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    observer.observe(card);
  });
}

// Inicialização do checklist interativo
function initializeChecklist() {
  const checklistItems = document.querySelectorAll('.checklist-item');
  
  checklistItems.forEach(item => {
    const header = item.querySelector('.checklist-header');
    const content = item.querySelector('.checklist-content');
    const progress = item.querySelector('.progress');
    
    header.addEventListener('click', () => {
      const isExpanded = item.classList.contains('expanded');
      
      // Fechar todos os outros itens
      checklistItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('expanded');
          otherItem.querySelector('.checklist-content').style.maxHeight = '0px';
        }
      });
      
      // Alternar item atual
      item.classList.toggle('expanded');
      content.style.maxHeight = isExpanded ? '0px' : `${content.scrollHeight}px`;
      
      // Animar progresso
      if (!isExpanded) {
        setTimeout(() => {
          progress.style.width = '100%';
        }, 100);
      } else {
        progress.style.width = '0%';
      }
    });
  });
}

// Adicionar classe fade-in aos elementos
document.querySelectorAll('section').forEach(section => {
  section.classList.add('fade-in');
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initExpandableItems();
  initRevealOnScroll();
  initContactForm();
  initMobileMenu();
  initConditionCards();
  initializeChecklist();
  initFloatingNav();
  initTouchSupport();
  initSmoothScroll();
  
  // Add scroll event listener
  window.addEventListener('scroll', updateScrollProgress);
  
  // Add click handlers for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScroll(anchor.getAttribute('href'));
    });
  });
});

function initFloatingNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Fechar menu ao clicar em um link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // Fechar menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.floating-nav')) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
}

// Melhor suporte para eventos de toque
function initTouchSupport() {
  document.addEventListener('touchstart', function() {}, {passive: true});
  
  const touchElements = document.querySelectorAll('.condition-card, .benefit-card, .team-card');
  
  touchElements.forEach(element => {
    element.addEventListener('touchstart', function(e) {
      e.preventDefault();
      this.classList.toggle('active');
    }, {passive: false});
  });
}

// Melhor controle de scroll em dispositivos móveis
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = 60;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollBy({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Fechar menu móvel se estiver aberto
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
        }
      }
    });
  });
}

  document.addEventListener('DOMContentLoaded', function() {
    // Selecionar todos os botões de tab
    const tabButtons = document.querySelectorAll('.tab-button');
    
    // Adicionar evento de clique a cada botão
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remover classe 'active' de todos os botões
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Adicionar classe 'active' ao botão clicado
        this.classList.add('active');
        
        // Obter o ID da tab a ser exibida
        const tabId = this.getAttribute('data-tab') + '-tab';
        
        // Esconder todos os conteúdos de tab
        document.querySelectorAll('.tab-content').forEach(tab => {
          tab.classList.remove('active');
        });
        
        // Mostrar o conteúdo da tab selecionada
        document.getElementById(tabId).classList.add('active');
      });
    });
  });
