document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-menu');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    toggle.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.classList.toggle('active-nav-open');
  });

  // Close mobile nav when a link is clicked
  nav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', function () {
      toggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.classList.remove('nav-open');
    });
  });

  // Mark active link based on location
  try {
    const current = location.pathname.replace(/\/$/, '');
    nav.querySelectorAll('a').forEach((a) => {
      const href = a.getAttribute('href');
      if (!href) return;
      const url = new URL(href, location.origin);
      const path = url.pathname.replace(/\/$/, '');
      if (path === current) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  } catch (e) {
    // ignore URL parsing errors
  }

  // FAQ Accordion functionality
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    
    question.addEventListener('click', function () {
      const isActive = item.classList.contains('active');
      
      // Close all other FAQ items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherIcon) otherIcon.textContent = '+';
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
      const icon = question.querySelector('.faq-icon');
      if (icon) {
        icon.textContent = isActive ? '+' : '−';
      }
    });
  });

  // FAQ Category filtering
  const categoryButtons = document.querySelectorAll('.category-button');
  const faqList = document.querySelector('.faq-list');
  
  if (categoryButtons.length > 0 && faqList) {
    categoryButtons.forEach((button) => {
      button.addEventListener('click', function () {
        // Update active button
        categoryButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
        
        const category = button.getAttribute('data-category');
        
        // Filter FAQ items
        faqItems.forEach((item) => {
          if (category === 'all') {
            item.style.display = '';
          } else {
            const itemCategories = item.getAttribute('data-categories') || '';
            if (itemCategories.includes(category)) {
              item.style.display = '';
            } else {
              item.style.display = 'none';
            }
          }
          // Close all items when filtering
          item.classList.remove('active');
          const icon = item.querySelector('.faq-icon');
          if (icon) icon.textContent = '+';
        });
      });
    });
  }
});
