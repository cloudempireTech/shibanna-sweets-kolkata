// Shibanna Sweets (শিবান্ন সুইটস) — Brand & Culinary Portfolio Interactive Script

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      
      const iconHam = mobileToggle.querySelector('.icon-hamburger');
      const iconClose = mobileToggle.querySelector('.icon-close');
      if (iconHam && iconClose) {
        iconHam.style.display = isOpen ? 'none' : 'block';
        iconClose.style.display = isOpen ? 'block' : 'none';
      }
    });

    // Close menu when clicking outside or clicking any nav link
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        const iconHam = mobileToggle.querySelector('.icon-hamburger');
        const iconClose = mobileToggle.querySelector('.icon-close');
        if (iconHam && iconClose) {
          iconHam.style.display = 'block';
          iconClose.style.display = 'none';
        }
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        const iconHam = mobileToggle.querySelector('.icon-hamburger');
        const iconClose = mobileToggle.querySelector('.icon-close');
        if (iconHam && iconClose) {
          iconHam.style.display = 'block';
          iconClose.style.display = 'none';
        }
      });
    });
  }

  // 2. Responsive Sticky Floating Tab Filter (TheDivine Style - Horizontal Rail)
  const filterButtons = document.querySelectorAll('.portfolio-filter button');
  const portfolioGroups = document.querySelectorAll('[data-portfolio-group]');

  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetFilter = button.getAttribute('data-filter');

        // Update active button state
        filterButtons.forEach(b => {
          const isActive = (b === button);
          b.classList.toggle('active', isActive);
          b.setAttribute('aria-pressed', String(isActive));
        });

        // Center clicked pill smoothly in the horizontal scroll rail
        button.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

        // Filter groups with smooth transition
        portfolioGroups.forEach(group => {
          const groupCategory = group.getAttribute('data-portfolio-group');
          const shouldShow = (targetFilter === 'all' || targetFilter === groupCategory);

          if (shouldShow) {
            group.hidden = false;
            group.style.opacity = '0';
            group.style.transform = 'translateY(14px)';
            requestAnimationFrame(() => {
              group.style.transition = 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
              group.style.opacity = '1';
              group.style.transform = 'translateY(0)';
            });
          } else {
            group.hidden = true;
          }
        });

        // If scrolled past filter bar, gently adjust scroll
        const filterContainer = document.querySelector('.directory-filter-container');
        if (filterContainer) {
          const rect = filterContainer.getBoundingClientRect();
          if (rect.top < 65) {
            window.scrollTo({
              top: window.scrollY + rect.top - 75,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  // 3. IntersectionObserver for Scroll Reveals
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
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('in-view'));
  }

  // 4. Header Shadow on Scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 5. Hero Video Play / Pause Toggle
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

  // 6. Bespoke WhatsApp Dialog Modal
  const enquiryDialog = document.getElementById('enquiry-dialog');
  const openDialogButtons = document.querySelectorAll('.open-enquiry-modal');
  const closeDialogBtn = enquiryDialog?.querySelector('.dialog-close');

  openDialogButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const presetItem = btn.getAttribute('data-item') || '';
      const itemSelect = document.getElementById('dialogEnquiryItem');
      if (itemSelect && presetItem) {
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

  // 7. Direct WhatsApp Portfolio Item Inquire Buttons
  const inquireButtons = document.querySelectorAll('.btn-card-inquire');
  inquireButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const itemTitle = btn.getAttribute('data-item') || 'Shibanna Artisanal Creations';
      const bengaliName = btn.getAttribute('data-bengali') || '';
      const text = `*Artisanal Portfolio Inquiry — Shibanna Sweets*\n` +
                   `• *Creation:* ${itemTitle} ${bengaliName ? `(${bengaliName})` : ''}\n` +
                   `• *Location:* 110/1/1B Dr. Lal Mohan Bhattacharya Road, Entally, Kolkata\n\n` +
                   `Hello Shibanna Sweets, I am admiring this creation on your online portfolio. Could you please share fresh batch availability or preparation details?`;
      const url = `https://wa.me/919830895062?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });

  // 8. WhatsApp Enquiry Forms Handler
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

      const text = `*New Inquiry — Shibanna Sweets (Kolkata)*\n` +
                   `• *Name:* ${name}\n` +
                   (phone ? `• *Phone:* ${phone}\n` : '') +
                   `• *Requirement:* ${item}\n` +
                   `• *Preferred Time/Date:* ${date}\n` +
                   `• *Notes:* ${notes}\n\n` +
                   `_Enquiry routed from Shibanna Sweets Website_`;

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
});
