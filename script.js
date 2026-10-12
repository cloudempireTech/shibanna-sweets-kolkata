// Shibanna Sweets (শিবান্ন সুইটস) — Brand & Culinary Portfolio Interactive Script

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Floating Tab Filter (TheDivine Style)
  const filterButtons = document.querySelectorAll('.portfolio-filter button');
  const portfolioGroups = document.querySelectorAll('[data-portfolio-group]');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetFilter = button.getAttribute('data-filter');

      // Update button active state
      filterButtons.forEach(b => {
        const isActive = (b === button);
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-pressed', String(isActive));
      });

      // Filter groups with smooth transition
      portfolioGroups.forEach(group => {
        const groupCategory = group.getAttribute('data-portfolio-group');
        const shouldShow = (targetFilter === 'all' || targetFilter === groupCategory);

        if (shouldShow) {
          group.hidden = false;
          group.style.opacity = '0';
          group.style.transform = 'translateY(16px)';
          requestAnimationFrame(() => {
            group.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
          });
        } else {
          group.hidden = true;
        }
      });

      // If clicked while scrolled, smoothly bring filter bar into comfortable view
      const filterWrap = document.querySelector('.directory-filter-container');
      if (filterWrap) {
        const rect = filterWrap.getBoundingClientRect();
        if (rect.top < 70) {
          window.scrollTo({
            top: window.scrollY + rect.top - 85,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 2. IntersectionObserver for Apple-Style Scroll Reveals
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback
    revealElements.forEach(el => el.classList.add('in-view'));
  }

  // 3. Header Scrolled Class on Scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 4. Hero Video Play / Pause Toggle
  const video = document.getElementById('heroVideo');
  const videoToggle = document.getElementById('videoToggle');
  if (video && videoToggle) {
    videoToggle.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        videoToggle.innerHTML = `
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          <span>Pause Video</span>
        `;
        videoToggle.setAttribute('aria-label', 'Pause background video');
      } else {
        video.pause();
        videoToggle.innerHTML = `
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          <span>Play Video</span>
        `;
        videoToggle.setAttribute('aria-label', 'Play background video');
      }
    });
  }

  // 5. Bespoke Enquiry Dialog Modal & Buttons
  const enquiryDialog = document.getElementById('enquiry-dialog');
  const openDialogButtons = document.querySelectorAll('.open-enquiry-modal');
  const closeDialogBtn = enquiryDialog?.querySelector('.dialog-close');

  openDialogButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const presetItem = btn.getAttribute('data-item') || '';
      const itemSelect = document.getElementById('dialogEnquiryItem');
      if (itemSelect && presetItem) {
        // select option matching presetItem or closest
        for (let i = 0; i < itemSelect.options.length; i++) {
          if (itemSelect.options[i].value.toLowerCase().includes(presetItem.toLowerCase())) {
            itemSelect.selectedIndex = i;
            break;
          }
        }
      }
      if (enquiryDialog && typeof enquiryDialog.showModal === 'function') {
        enquiryDialog.showModal();
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeDialogBtn && enquiryDialog) {
    closeDialogBtn.addEventListener('click', () => {
      enquiryDialog.close();
      document.body.style.overflow = '';
    });

    enquiryDialog.addEventListener('click', (e) => {
      const rect = enquiryDialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        enquiryDialog.close();
        document.body.style.overflow = '';
      }
    });
  }

  // 6. Direct WhatsApp Portfolio Item Inquiry
  const inquireButtons = document.querySelectorAll('.btn-card-inquire');
  inquireButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const itemTitle = btn.getAttribute('data-item') || 'Shibanna Artisanal Creations';
      const bengaliName = btn.getAttribute('data-bengali') || '';
      const text = `*Artisanal Portfolio Inquiry — Shibanna Sweets*\n` +
                   `• *Creation:* ${itemTitle} ${bengaliName ? `(${bengaliName})` : ''}\n` +
                   `• *Location:* 110/1/1B Dr. Lal Mohan Bhattacharya Road, Entally, Kolkata\n\n` +
                   `Hello Shibanna Sweets, I am admiring this creation on your online portfolio. Could you please share fresh batch availability or preparation details for my upcoming visit / occasion?`;
      const url = `https://wa.me/919830895062?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });

  // 7. WhatsApp Enquiry Forms Handler (Main Form & Modal Form)
  function setupWaForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]')?.value.trim() || 'Patron';
      const phone = form.querySelector('[name="phone"]')?.value.trim() || '';
      const item = form.querySelector('[name="item"]')?.value.trim() || 'General Sweet Inquiry';
      const date = form.querySelector('[name="date"]')?.value.trim() || 'Flexible';
      const notes = form.querySelector('[name="notes"]')?.value.trim() || 'None';

      const text = `*New Bespoke Inquiry — Shibanna Sweets (Kolkata)*\n` +
                   `• *Client Name:* ${name}\n` +
                   (phone ? `• *Contact:* ${phone}\n` : '') +
                   `• *Creation / Service:* ${item}\n` +
                   `• *Occasion / Date:* ${date}\n` +
                   `• *Requirements & Details:* ${notes}\n\n` +
                   `_Enquiry routed via Shibanna Sweets Culinary Portfolio_`;

      const url = `https://wa.me/919830895062?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      if (enquiryDialog && enquiryDialog.open) {
        enquiryDialog.close();
        document.body.style.overflow = '';
      }
    });
  }

  setupWaForm('whatsappEnquiryForm');
  setupWaForm('dialogEnquiryForm');

  // 8. Mobile Menu Toggle
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isExpanded = navLinks.style.display === 'flex';
      navLinks.style.display = isExpanded ? 'none' : 'flex';
      if (!isExpanded) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#FFFFFF';
        navLinks.style.padding = '1.5rem';
        navLinks.style.boxShadow = '0 12px 30px rgba(0,0,0,0.1)';
        navLinks.style.gap = '1rem';
      }
      toggle.setAttribute('aria-expanded', String(!isExpanded));
    });
  }
});
