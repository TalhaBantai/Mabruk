 // Updated main.js: trigger slide animations before navigation

document.addEventListener('DOMContentLoaded', function() {
  // Basic navigation without animations
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', function(event) {
      const targetUrl = new URL(this.href, window.location.origin);
      // Only process same-origin links that aren't anchor links
      if (targetUrl.origin !== window.location.origin || targetUrl.hash) return;
      
      // No animations, just standard navigation
    });
  });

  // Add hover effects for About page sections
  if (window.location.pathname.includes('about.html')) {
    // Add hover tracking class
    const aboutSections = document.querySelectorAll('.about-section, .vision-mission > div, .service-category, .additional-services, .industries-served, .why-choose-us');
    
    aboutSections.forEach(section => {
      // Add hover tracking class
      section.classList.add('hover-track');
    });
    
    // Add hover effects to list items
    const listItems = document.querySelectorAll('.about-section ul li, .service-category ul li, .additional-services ul li, .industries-served ul li, .why-choose-us ul li');
    
    listItems.forEach(item => {
      // Add hover tracking class
      item.classList.add('hover-track-item');
    });
  }
});

// Simple and reliable scroll-based hover effects for mobile
document.addEventListener('DOMContentLoaded', function() {
  // Only run on mobile devices
  if (window.innerWidth <= 768) {
    // Get all content blocks that should have hover effects
    const contentBlocks = document.querySelectorAll(
      '.service-item, .about-section, .vision-mission > div, ' + 
      '.service-category, .additional-services, .industries-served, ' + 
      '.why-choose-us, .contact-container > div'
    );
    
    // Create a simple Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // When a block enters the viewport
        if (entry.isIntersecting) {
          // Add hover effect class
          entry.target.classList.add('mobile-hover-active');
          
          // Remove the effect after animation completes
          setTimeout(() => {
            entry.target.classList.remove('mobile-hover-active');
          }, 1500);
        }
      });
    }, {
      threshold: 0.3 // trigger when 30% of the element is visible
    });
    
    // Observe all content blocks
    contentBlocks.forEach(block => {
      observer.observe(block);
    });
  }
});

// Fallback scroll-based hover using scroll events
document.addEventListener('DOMContentLoaded', function() {
  // Only run on mobile devices
  if (window.innerWidth <= 768) {
    // Get all content blocks
    const contentBlocks = document.querySelectorAll(
      '.service-item, .about-section, .vision-mission > div, ' + 
      '.service-category, .additional-services, .industries-served, ' + 
      '.why-choose-us, .contact-container > div'
    );
    
    // Track which element is currently active
    let activeElement = null;
    let activeTimeout = null;
    
    // Function to check which element is in the center of the viewport
    const checkCenterElement = () => {
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      
      // Find the element closest to the center
      let closestElement = null;
      let closestDistance = Infinity;
      
      contentBlocks.forEach(block => {
        const rect = block.getBoundingClientRect();
        const elementCenter = rect.top + (rect.height / 2);
        const distance = Math.abs(elementCenter - viewportCenter);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestElement = block;
        }
      });
      
      // If we found an element and it's different from the current active one
      if (closestElement && closestElement !== activeElement) {
        // Remove active class from previous element
        if (activeElement) {
          activeElement.classList.remove('mobile-hover-active');
        }
        
        // Clear any existing timeout
        if (activeTimeout) {
          clearTimeout(activeTimeout);
        }
        
        // Set new active element
        activeElement = closestElement;
        activeElement.classList.add('mobile-hover-active');
        
        // Set timeout to remove the class
        activeTimeout = setTimeout(() => {
          activeElement.classList.remove('mobile-hover-active');
          activeElement = null;
        }, 1500);
      }
    };
    
    // Check on scroll
    window.addEventListener('scroll', () => {
      // Use requestAnimationFrame to limit how often this runs
      requestAnimationFrame(checkCenterElement);
    });
    
    // Initial check
    setTimeout(checkCenterElement, 500);
  }
});

// Contact form submission handler
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      // Get form data
      const formData = new FormData(contactForm);
      
      // Send form data to backend
      fetch('/send-message', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        // Display success or error message
        formStatus.style.display = 'block';
        
        if (data.success) {
          formStatus.textContent = data.message || 'Your message has been sent successfully!';
          formStatus.style.backgroundColor = '#e8f5e9';
          formStatus.style.color = '#2e7d32';
          contactForm.reset(); // Clear the form
        } else {
          formStatus.textContent = data.error || 'Failed to send message. Please try again.';
          formStatus.style.backgroundColor = '#ffebee';
          formStatus.style.color = '#c62828';
        }
        
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        
        // Hide status message after 5 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      })
      .catch(error => {
        console.error('Error:', error);
        formStatus.style.display = 'block';
        formStatus.textContent = 'An error occurred. Please try again later.';
        formStatus.style.backgroundColor = '#ffebee';
        formStatus.style.color = '#c62828';
        
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      });
    });
  }
});



















