// ============================================================
// KNCHR COMPENSATION & REPARATIONS — INTERACTIVE FEATURES
// ============================================================

document.addEventListener('DOMContentLoaded', function() {

  // ============================================================
  // 1. "LEARN MORE" BUTTON — BLINK IN 2 COLORS
  // ============================================================
  const learnMoreBtn = document.querySelector('.btn-outline');
  if (learnMoreBtn) {
    // Store original styles
    const originalBg = learnMoreBtn.style.background || 'white';
    const originalColor = learnMoreBtn.style.color || '';
    const originalBorder = learnMoreBtn.style.border || '';

    // Color pairs for blinking
    const colorPairs = [
      { bg: '#e97c10', color: '#ffffff', border: '2px solid #e88a2a' },
      { bg: '#264677', color: '#ffffff', border: '2px solid #1a2d4a' }
    ];

    let blinkInterval = null;
    let isBlinking = true;
    let blinkCount = 0;
    const maxBlinks = 6; // 3 full cycles (2 colors × 3 cycles)

    function startBlinking() {
      let index = 0;
      blinkCount = 0;
      
      if (blinkInterval) {
        clearInterval(blinkInterval);
      }

      blinkInterval = setInterval(() => {
        if (blinkCount >= maxBlinks) {
          // Stop blinking after max cycles
          clearInterval(blinkInterval);
          blinkInterval = null;
          // Reset to original state
          learnMoreBtn.style.background = originalBg;
          learnMoreBtn.style.color = originalColor;
          learnMoreBtn.style.border = originalBorder;
          learnMoreBtn.style.transform = 'scale(1)';
          return;
        }

        const pair = colorPairs[index % colorPairs.length];
        learnMoreBtn.style.background = pair.bg;
        learnMoreBtn.style.color = pair.color;
        learnMoreBtn.style.border = pair.border;
        learnMoreBtn.style.transform = 'scale(1.03)';
        
        // Add a subtle pulse
        setTimeout(() => {
          learnMoreBtn.style.transform = 'scale(1)';
        }, 200);

        index++;
        blinkCount++;
      }, 300); // Change every 400ms
    }

    // Start blinking on page load (after a small delay)
    setTimeout(startBlinking, 500);

    // Stop blinking on hover, resume on mouse leave
    learnMoreBtn.addEventListener('mouseenter', function() {
      if (blinkInterval) {
        clearInterval(blinkInterval);
        blinkInterval = null;
      }
      // Reset to accent color on hover
      this.style.background = '#e88a2a';
      this.style.color = '#ffffff';
      this.style.border = '2px solid #e88a2a';
      this.style.transform = 'scale(1.05)';
    });

    learnMoreBtn.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      // Resume blinking
      if (!blinkInterval) {
        setTimeout(startBlinking, 300);
      }
    });

    // Click handler (smooth scroll)
    learnMoreBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Stop blinking temporarily
      if (blinkInterval) {
        clearInterval(blinkInterval);
        blinkInterval = null;
      }
      
      // Flash effect on click
      this.style.background = '#ffffff';
      this.style.color = '#e88a2a';
      this.style.border = '2px solid #e88a2a';
      setTimeout(() => {
        this.style.background = '#e88a2a';
        this.style.color = '#ffffff';
        this.style.border = '2px solid #e88a2a';
      }, 200);

      // Smooth scroll to contact section
      const contactCard = document.querySelector('.contact-card');
      if (contactCard) {
        contactCard.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }

      // Resume blinking after scroll
      setTimeout(startBlinking, 1000);
    });
  }

  // ============================================================
  // 2. "CONTACT" HEADING — PULSE WITH ITS OWN COLOR
  // ============================================================
  const contactHeading = document.querySelector('.contact-card .section-title');
  if (contactHeading) {
    // Store original color
    const originalColor = contactHeading.style.color || '#e88a2a';
    let pulseInterval = null;
    let isPulsing = true;

    function startPulsing() {
      let direction = 1;
      let opacity = 1;
      
      if (pulseInterval) {
        clearInterval(pulseInterval);
      }

      pulseInterval = setInterval(() => {
        // Fade in and out
        opacity += direction * 0.05;
        if (opacity >= 1) {
          opacity = 1;
          direction = -1;
        } else if (opacity <= 0.4) {
          opacity = 0.4;
          direction = 1;
        }
        
        contactHeading.style.opacity = opacity;
        contactHeading.style.transform = `scale(${1 + (1 - opacity) * 0.05})`;
      }, 100);
    }

    // Start pulsing after a delay
    setTimeout(startPulsing, 800);

    // Stop pulsing on hover
    contactHeading.addEventListener('mouseenter', function() {
      if (pulseInterval) {
        clearInterval(pulseInterval);
        pulseInterval = null;
      }
      this.style.opacity = '1';
      this.style.transform = 'scale(1.05)';
      this.style.color = '#d4af37'; // Gold on hover
    });

    contactHeading.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.color = originalColor;
      // Resume pulsing
      if (!pulseInterval) {
        setTimeout(startPulsing, 500);
      }
    });
  }

  // ============================================================
  // 3. COPY EMAIL TO CLIPBOARD (with feedback)
  // ============================================================
  const emailLink = document.querySelector('.contact-item .value a[href^="mailto:"]');
  if (emailLink) {
    emailLink.addEventListener('click', function(e) {
      e.preventDefault();
      
      const email = this.textContent.trim();
      
      navigator.clipboard.writeText(email).then(() => {
        showToast('📧 Email copied to clipboard!');
      }).catch(() => {
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('📧 Email copied to clipboard!');
      });
    });
  }

  // ============================================================
  // 4. TOAST NOTIFICATION SYSTEM
  // ============================================================
  function showToast(message) {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'linear-gradient(135deg, #0f1a2e 0%, #1a2d4a 100%)',
      color: 'white',
      padding: '0.8rem 2rem',
      borderRadius: '50px',
      fontFamily: '"Inter", sans-serif',
      fontSize: '0.95rem',
      fontWeight: '500',
      boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
      zIndex: '9999',
      opacity: '0',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      transform: 'translateX(-50%) translateY(20px)',
      maxWidth: '90%',
      textAlign: 'center',
      border: '1px solid rgba(232, 138, 42, 0.2)'
    });

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, 300);
    }, 3000);
  }

  // ============================================================
  // 5. PHONE NUMBER CLICK TRACKING
  // ============================================================
  const phoneLinks = document.querySelectorAll('.contact-item .value:not(.value a)');
  phoneLinks.forEach(item => {
    const text = item.textContent.trim();
    if (text.match(/^[\+\d\s\-\(\)]+$/)) {
      const parent = item.parentElement;
      const link = document.createElement('a');
      link.href = `tel:${text.replace(/\s/g, '')}`;
      link.textContent = text;
      link.style.color = '#0f1a2e';
      link.style.textDecoration = 'none';
      link.style.borderBottom = '1px dotted #e88a2a';
      
      link.addEventListener('click', function(e) {
        console.log(`📞 Phone number clicked: ${text}`);
      });
      
      item.textContent = '';
      item.appendChild(link);
    }
  });

  // ============================================================
  // 6. SOCIAL ICON TRACKING
  // ============================================================
  const socialLinks = document.querySelectorAll('.social-row a');
  socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const platform = this.getAttribute('aria-label') || 'social';
      console.log(`🔗 Social icon clicked: ${platform}`);
    });
  });

  // ============================================================
  // 7. HASHTAG COPY TO CLIPBOARD
  // ============================================================
  const hashtags = document.querySelectorAll('.hashtag');
  hashtags.forEach(tag => {
    tag.style.cursor = 'pointer';
    tag.title = 'Click to copy hashtag';
    
    tag.addEventListener('click', function() {
      const hashtagText = this.textContent.trim();
      
      navigator.clipboard.writeText(hashtagText).then(() => {
        showToast(`✅ Copied: ${hashtagText}`);
      }).catch(() => {
        const tempInput = document.createElement('input');
        tempInput.value = hashtagText;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast(`✅ Copied: ${hashtagText}`);
      });
    });
  });

  // ============================================================
  // 8. KEYBOARD NAVIGATION SUPPORT
  // ============================================================
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const toast = document.querySelector('.toast-notification');
      if (toast) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => {
          if (toast.parentNode) {
            toast.remove();
          }
        }, 300);
      }
    }
  });

  // ============================================================
  // 9. PAGE LOAD ANIMATION
  // ============================================================
  const card = document.querySelector('.card');
  if (card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100);
  }

  // ============================================================
  // 10. CONSOLE WELCOME
  // ============================================================
  console.log('%c🇰🇪 KNCHR — Compensation & Reparations', 'font-size: 20px; font-weight: bold; color: #0f1a2e;');
  console.log('%cRestoring Dignity · Upholding Rights · Ensuring Accountability', 'font-size: 14px; color: #e88a2a;');
  console.log('📧 reparations@knchr.org | 🌐 knchr.org');

  // ============================================================
  // 11. ADD VISUAL FEEDBACK TO CONTACT ITEMS (optional extra)
  // ============================================================
  const contactItems = document.querySelectorAll('.contact-item');
  contactItems.forEach((item, index) => {
    item.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
      this.style.transform = 'translateX(5px)';
      this.style.backgroundColor = 'rgba(232, 138, 42, 0.05)';
      this.style.borderRadius = '8px';
      this.style.padding = '0.2rem 0.5rem';
      this.style.marginLeft = '-0.5rem';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(0)';
      this.style.backgroundColor = 'transparent';
      this.style.padding = '0';
      this.style.marginLeft = '0';
    });
  });

}); // end DOMContentLoaded