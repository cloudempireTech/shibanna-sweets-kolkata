// Shibanna Sweets Interactive Script
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const expanded = toggle.getAttribute('aria-expanded') === 'true' || false;
      toggle.setAttribute('aria-expanded', !expanded);
    });
  }

  // 2. Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Hero Video Play / Pause Toggle
  const video = document.getElementById('heroVideo');
  const videoToggle = document.getElementById('videoToggle');
  if (video && videoToggle) {
    videoToggle.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        videoToggle.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          <span>Pause Video</span>
        `;
        videoToggle.setAttribute('aria-label', 'Pause background video');
      } else {
        video.pause();
        videoToggle.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          <span>Play Video</span>
        `;
        videoToggle.setAttribute('aria-label', 'Play background video');
      }
    });
  }

  // 4. WhatsApp Enquiry Form Handler (CRITICAL REQUIREMENT)
  const enquiryForm = document.getElementById('whatsappEnquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('enquiryName')?.value.trim() || '';
      const phone = document.getElementById('enquiryPhone')?.value.trim() || '';
      const item = document.getElementById('enquiryItem')?.value.trim() || '';
      const time = document.getElementById('enquiryTime')?.value.trim() || 'Anytime';
      const message = document.getElementById('enquiryMessage')?.value.trim() || '';

      const text = `*New Sweet Enquiry - Shibanna Sweets*\n` +
                   `• *Name:* ${name}\n` +
                   (phone ? `• *Customer Contact:* ${phone}\n` : '') +
                   `• *Sweet / Service:* ${item}\n` +
                   `• *Preferred Time:* ${time}\n` +
                   `• *Details:* ${message}\n\n` +
                   `_Enquiry initiated from Shibanna Sweets website_`;

      const encoded = encodeURIComponent(text);
      const waUrl = `https://wa.me/919830895062?text=${encoded}`;
      
      // Open in new tab for customer review
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // 5. Card Order Buttons helper
  const orderButtons = document.querySelectorAll('.btn-card-order');
  orderButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const itemName = btn.getAttribute('data-item') || 'Fresh Sweets Assortment';
      const msg = `Hi Shibanna Sweets, I would like to order / enquire about *${itemName}*. Could you please let me know availability and pricing?`;
      const url = `https://wa.me/919830895062?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
});
