(function() {
  'use strict';
  
  function makeLogoClickable() {
    const logos = document.querySelectorAll('.logo');
    logos.forEach(logo => {
      if (!logo.getAttribute('href') && logo.tagName !== 'A') {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function() {
          window.location.href = '../html/landingPage.html';
        });
      }
    });
  }
  
  function createBackToTopButton() {
    if (document.getElementById('back-to-top')) return;
    
    const button = document.createElement('button');
    button.id = 'back-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.setAttribute('aria-label', 'Back to top');
    button.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #27ae60, #2c3e50);
      color: white;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1000;
      box-shadow: 0 4px 15px rgba(39, 174, 96, 0.4);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        button.style.opacity = '1';
        button.style.visibility = 'visible';
      } else {
        button.style.opacity = '0';
        button.style.visibility = 'hidden';
      }
    });
    
    button.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1) translateY(-5px)';
      this.style.boxShadow = '0 6px 20px rgba(39, 174, 96, 0.6)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) translateY(0)';
      this.style.boxShadow = '0 4px 15px rgba(39, 174, 96, 0.4)';
    });
  }
  
  function updateFooterLinks() {
    const footerLinks = {
      'Shop Gear': '../html/ProductCatalogue.html',
      'Find Trails': '../html/TrailsPage.html',
      'Join Community': '../html/GroupHikes.html',
      'About Us': '../html/AboutUsPage.html',
      'Contact Us': '#contact',
      'Shipping Info': '#',
      'Returns': '#',
      'Size Guide': '#',
      'Newsletter': '#',
      'Social Media': '#',
      'Events': '#',
      'Blog': '#'
    };
    
    document.querySelectorAll('.footer-links a').forEach(link => {
      const text = link.textContent.trim();
      if (footerLinks[text]) {
        link.href = footerLinks[text];
      }
    });
  }
  
  function addSocialMediaIcons() {
    const connectSection = Array.from(document.querySelectorAll('.footer-section'))
      .find(section => section.querySelector('h3')?.textContent === 'Connect');
    
    if (connectSection && !document.querySelector('.social-media-icons')) {
      const socialDiv = document.createElement('div');
      socialDiv.className = 'social-media-icons';
      socialDiv.style.cssText = `
        display: flex;
        gap: 15px;
        margin-top: 15px;
        justify-content: flex-start;
      `;
      
      const socialLinks = [
        { icon: 'fa-facebook-f', url: '#', label: 'Facebook' },
        { icon: 'fa-twitter', url: '#', label: 'Twitter' },
        { icon: 'fa-instagram', url: '#', label: 'Instagram' },
        { icon: 'fa-youtube', url: '#', label: 'YouTube' },
        { icon: 'fa-linkedin-in', url: '#', label: 'LinkedIn' }
      ];
      
      socialLinks.forEach(social => {
        const link = document.createElement('a');
        link.href = social.url;
        link.className = 'social-link';
        link.setAttribute('aria-label', social.label);
        link.innerHTML = `<i class="fab ${social.icon}"></i>`;
        link.style.cssText = `
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(39, 174, 96, 0.1);
          border-radius: 50%;
          color: #27ae60;
          transition: all 0.3s ease;
          text-decoration: none;
          font-size: 1.1rem;
        `;
        
        link.addEventListener('mouseenter', function() {
          this.style.background = '#27ae60';
          this.style.color = 'white';
          this.style.transform = 'translateY(-3px)';
        });
        
        link.addEventListener('mouseleave', function() {
          this.style.background = 'rgba(39, 174, 96, 0.1)';
          this.style.color = '#27ae60';
          this.style.transform = 'translateY(0)';
        });
        
        socialDiv.appendChild(link);
      });
      
      const socialMediaLink = Array.from(connectSection.querySelectorAll('.footer-links a'))
        .find(link => link.textContent.trim() === 'Social Media');
      
      if (socialMediaLink) {
        socialMediaLink.parentElement.appendChild(socialDiv);
      }
    }
  }
  
  function init() {
    makeLogoClickable();
    createBackToTopButton();
    updateFooterLinks();
    addSocialMediaIcons();
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();