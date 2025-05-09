// Improved domain-loader.js - Dynamic content for multiple domains
console.log('Domain Loader v2.0 - Starting up...');

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM ready - Beginning domain detection');

  // STEP 1: Get current domain
  const currentDomain = window.location.hostname;
  console.log('Current domain detected:', currentDomain);

  // Show loading indicator
  const loadingStatus = createStatusOverlay('Loading domain content...');

  // STEP 2: Load configuration
  loadConfigForDomain(currentDomain)
    .then(domainConfig => {
      // Apply domain-specific content
      applyDomainContent(domainConfig);

      // Update status
      loadingStatus.textContent =
        'Content loaded for: ' + domainConfig.domainName;
      loadingStatus.style.backgroundColor = 'rgba(0, 128, 0, 0.8)';

      // Remove status after 3 seconds
      setTimeout(() => {
        loadingStatus.style.opacity = '0';
        setTimeout(() => loadingStatus.remove(), 500);
      }, 3000);
    })
    .catch(error => {
      console.error('Error in domain loading:', error);
      loadingStatus.textContent = 'Error loading domain content';
      loadingStatus.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';

      // Apply emergency content
      applyEmergencyContent();
    });
});

// Load config for specific domain with fallbacks
function loadConfigForDomain(domain) {
  return new Promise((resolve, reject) => {
    console.log('Loading config for domain:', domain);

    // Fetch configuration file with cache busting
    fetch('./config.json?t=' + new Date().getTime())
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load config.json: ' + response.status);
        }
        return response.json();
      })
      .then(config => {
        // Store config globally for debugging
        window.siteConfig = config;
        console.log('Config loaded successfully');

        // Try various ways to match the domain
        let matchedDomain = findMatchingDomain(domain, config);

        if (matchedDomain) {
          // Add the actual domain name to the config for reference
          config[matchedDomain].domainName = matchedDomain;
          resolve(config[matchedDomain]);
        } else {
          // No match found, use first domain as fallback
          const fallbackDomain = Object.keys(config)[0];
          console.warn(
            'No matching domain found, using fallback:',
            fallbackDomain
          );

          // Add the fallback domain name to the config
          config[fallbackDomain].domainName = fallbackDomain;
          resolve(config[fallbackDomain]);
        }
      })
      .catch(error => {
        console.error('Error loading configuration:', error);
        reject(error);
      });
  });
}

// Find matching domain in config using various matching strategies
function findMatchingDomain(domain, config) {
  console.log('Finding match for:', domain, 'in config');

  // Strategy 1: Direct match
  if (config[domain]) {
    console.log('✓ Exact match found:', domain);
    return domain;
  }

  // Strategy 2: With/without www prefix
  if (domain.startsWith('www.')) {
    const withoutWww = domain.substring(4);
    if (config[withoutWww]) {
      console.log('✓ Match found without www:', withoutWww);
      return withoutWww;
    }
  } else {
    const withWww = 'www.' + domain;
    if (config[withWww]) {
      console.log('✓ Match found with www:', withWww);
      return withWww;
    }
  }

  // Strategy 3: Partial domain match (e.g. "example.com" matches "sub.example.com")
  for (const configDomain in config) {
    if (domain.includes(configDomain) || configDomain.includes(domain)) {
      console.log('✓ Partial match found:', configDomain);
      return configDomain;
    }
  }

  // Strategy 4: IP address or localhost check
  if (domain === '127.0.0.1' || domain === 'localhost') {
    console.log('Local development detected');
    // Return the first domain as a fallback for local development
    const firstDomain = Object.keys(config)[0];
    return firstDomain;
  }

  // No match found
  console.log('✗ No matching domain found in config');
  return null;
}

// Apply domain specific content
function applyDomainContent(domainConfig) {
  console.log('Applying content for domain:', domainConfig.domainName);

  try {
    // 1. Set page title
    if (domainConfig.title) {
      document.title = domainConfig.title;
      console.log('✓ Updated page title:', domainConfig.title);
    }

    // 2. Update hero title
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle && domainConfig.title) {
      heroTitle.innerHTML = `<span class="ld-fh-txt">${domainConfig.title}</span>`;
      console.log('✓ Updated hero title');
    }

    // 3. Update hero text
    const heroText = document.getElementById('hero-text');
    if (heroText && domainConfig.text) {
      heroText.innerHTML = `<span class="ld-fh-txt">${domainConfig.text}</span>`;
      console.log('✓ Updated hero text');
    }

    // 4. Update "for you" text
    const forYouText = document.getElementById('for-you-text');
    if (forYouText && domainConfig.forYou) {
      forYouText.innerHTML = domainConfig.forYou;
      console.log("✓ Updated 'for you' text");
    }

    // 5. Update hero image
    const heroImg = document.getElementById('hero-img');
    if (heroImg && domainConfig.heroImg) {
      heroImg.src = domainConfig.heroImg;
      console.log('✓ Updated hero image to:', domainConfig.heroImg);

      // Ensure it's visible
      heroImg.style.display = 'block';
      heroImg.style.visibility = 'visible';
      heroImg.style.opacity = '1';
    }

    // 6. Update services if defined
    if (domainConfig.services && domainConfig.services.length > 0) {
      updateServices(domainConfig.services);
      console.log('✓ Updated services');
    }

    // 7. Update gallery if defined
    if (domainConfig.gallery && domainConfig.gallery.length > 0) {
      updateGallery(domainConfig.gallery);
      console.log('✓ Updated gallery');
    }

    // 8. Update video if defined
    if (domainConfig.video) {
      updateVideo(domainConfig.video);
      console.log('✓ Updated video');
    }

    // 9. Update FAQs if defined
    if (domainConfig.faqs) {
      updateFaqs(domainConfig.faqs);
      console.log('✓ Updated FAQs');
    }

    // 10. Remove loading overlay if it exists
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.style.display = 'none';
      console.log('✓ Removed loading overlay');
    }

    console.log('Domain content applied successfully!');
  } catch (error) {
    console.error('Error applying domain content:', error);
    // Apply emergency content if there's an error
    applyEmergencyContent();
  }
}

// Apply emergency content as a fallback
function applyEmergencyContent() {
  console.log('Applying emergency content fallback');

  // Basic visibility fixes for critical elements
  document.querySelectorAll('img').forEach(img => {
    img.style.display = 'block';
    img.style.visibility = 'visible';
    img.style.opacity = '1';
  });

  // Remove loading overlay
  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.style.display = 'none';
  }

  console.log('Emergency fallback content applied');
}

// Update services section
function updateServices(services) {
  const serviceContainers = document.querySelectorAll('.iconbox');
  if (serviceContainers.length === 0) {
    console.warn('No service containers found');
    return;
  }

  services.forEach((service, index) => {
    if (index < serviceContainers.length) {
      const container = serviceContainers[index];

      // Update title
      const title = container.querySelector('h3');
      if (title) {
        title.textContent = service.title;
      }

      // Update description
      const desc = container.querySelector('p');
      if (desc) {
        desc.textContent = service.desc;
      }

      // Update icon
      const iconContainer = container.querySelector('.iconbox-icon-container');
      if (iconContainer && service.icon) {
        // Clear existing icon
        iconContainer.innerHTML = '';

        // Create new icon
        const icon = document.createElement('i');
        icon.className = service.icon;
        iconContainer.appendChild(icon);
      }
    }
  });
}

// Update gallery section
function updateGallery(gallery) {
  const galleryItems = document.querySelectorAll('.ld-pf-item');
  if (galleryItems.length === 0) {
    console.warn('No gallery items found');
    return;
  }

  gallery.forEach((item, index) => {
    if (index < galleryItems.length) {
      const container = galleryItems[index];

      // Update image
      const image = container.querySelector('img');
      if (image && item.src) {
        image.src = item.src;
        image.alt = item.alt || '';
      }

      // Update background image
      const figure = container.querySelector('figure');
      if (figure && item.src) {
        figure.style.backgroundImage = `url('${item.src}')`;
      }

      // Update title
      const title = container.querySelector('.ld-pf-title');
      if (title) {
        title.textContent = item.title || '';
      }
    }
  });
}

// Update video section
function updateVideo(videoUrl) {
  const videoLinks = document.querySelectorAll('a.fresco');
  videoLinks.forEach(link => {
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      link.href = videoUrl;
    }
  });
}

// Update FAQs section
function updateFaqs(faqs) {
  const accordion = document.getElementById('accordion-2');
  if (!accordion) {
    console.warn('FAQ accordion not found');
    return;
  }

  // Clear existing FAQs
  accordion.innerHTML = '';

  // Update section title if it exists
  const faqSection = document.querySelector('header.fancy-heading h2');
  if (faqSection) {
    faqSection.textContent = 'Frequently Asked Questions';
  }

  // Add FAQs
  faqs.forEach((faq, index) => {
    const isActive = index === 0;
    const accordionItem = document.createElement('div');
    accordionItem.className = `accordion-item panel ${
      isActive ? 'active' : ''
    }`;

    accordionItem.innerHTML = `
      <div class="accordion-heading" role="tab" id="accordion-collapse-heading-${index}">
        <h4 class="accordion-title font-size-19">
          <a class="${isActive ? '' : 'collapsed'}" 
             data-toggle="collapse" 
             data-parent="#accordion-2" 
             href="#accordion-collapse-panel-${index}" 
             aria-expanded="${isActive ? 'true' : 'false'}" 
             aria-controls="accordion-collapse-panel-${index}">
            ${faq.question}
            <span class="accordion-expander">
              <i class="icon-arrows_circle_plus"></i>
              <i class="icon-arrows_circle_minus"></i>
            </span>
          </a>
        </h4>
      </div>
      <div id="accordion-collapse-panel-${index}" 
           class="accordion-collapse collapse ${isActive ? 'in' : ''}" 
           role="tabpanel" 
           aria-labelledby="accordion-collapse-heading-${index}">
        <div class="accordion-content">
          <p>${faq.answer}</p>
        </div>
      </div>
    `;

    accordion.appendChild(accordionItem);
  });
}

// Create a status overlay to show loading progress
function createStatusOverlay(message) {
  const statusOverlay = document.createElement('div');
  statusOverlay.style.position = 'fixed';
  statusOverlay.style.top = '20px';
  statusOverlay.style.right = '20px';
  statusOverlay.style.padding = '10px 15px';
  statusOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  statusOverlay.style.color = 'white';
  statusOverlay.style.borderRadius = '5px';
  statusOverlay.style.fontFamily = 'Arial, sans-serif';
  statusOverlay.style.fontSize = '14px';
  statusOverlay.style.zIndex = '9999';
  statusOverlay.style.transition = 'opacity 0.5s';
  statusOverlay.textContent = message;
  document.body.appendChild(statusOverlay);

  return statusOverlay;
}
